import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, FileText, Loader2 } from 'lucide-react';
import logo from '../../assets/techastra-logo.png';
import { database } from '../../firebaseConfig';
import { ref, push, set } from 'firebase/database';

const AgreementGenerator = () => {
    const [clientData, setClientData] = useState({
        clientName: '',
        projectTitle: '',
        projectDescription: '',
        price: '',
        duration: '',
        startDate: new Date().toISOString().split('T')[0]
    });
    const [generating, setGenerating] = useState(false);
    const agreementRef = useRef();

    const handleChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    };

    const generatePDF = async () => {
        setGenerating(true);
        try {
            const element = agreementRef.current;
            const canvas = await html2canvas(element, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            // Save to Database
            const clientsRef = ref(database, 'clients');
            await push(clientsRef, {
                ...clientData,
                status: 'Pending',
                generatedAt: Date.now()
            });

            pdf.save(`${clientData.clientName.replace(/\s+/g, '_')}_Agreement.pdf`);
            alert("Agreement downloaded and Client saved to database!");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full">
            {/* Form Section */}
            <div className="w-full lg:w-1/3 bg-[#0f0f16]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl overflow-y-auto">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FileText className="text-cyan-500" />
                    Agreement Details
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">CLIENT NAME</label>
                        <input
                            type="text"
                            name="clientName"
                            value={clientData.clientName}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">PROJECT TITLE</label>
                        <input
                            type="text"
                            name="projectTitle"
                            value={clientData.projectTitle}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                            placeholder="E-commerce Website"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">PROJECT DESCRIPTION</label>
                        <textarea
                            name="projectDescription"
                            value={clientData.projectDescription}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none h-24 resize-none"
                            placeholder="Scope of work..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">PRICE (₹)</label>
                            <input
                                type="text"
                                name="price"
                                value={clientData.price}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                                placeholder="50000"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">DURATION</label>
                            <input
                                type="text"
                                name="duration"
                                value={clientData.duration}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                                placeholder="2 Weeks"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">START DATE</label>
                        <input
                            type="date"
                            name="startDate"
                            value={clientData.startDate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                        />
                    </div>

                    <button
                        onClick={generatePDF}
                        disabled={generating || !clientData.clientName}
                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center justify-center gap-2 mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {generating ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Preview Section */}
            <div className="w-full lg:w-2/3 bg-gray-200/50 rounded-2xl p-4 overflow-y-auto flex justify-center">
                <div
                    ref={agreementRef}
                    className="bg-white text-black w-[210mm] min-h-[297mm] p-[20mm] shadow-lg relative flex flex-col"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                    {/* Letterhead Header */}
                    <div className="flex justify-between items-center border-b-2 border-cyan-700 pb-4 mb-8">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="TechAstra" className="w-16 h-16 object-contain" />
                            <div>
                                <h1 className="text-3xl font-bold text-cyan-800 tracking-wide">TechAstra</h1>
                                <p className="text-xs text-gray-600 tracking-widest uppercase">Innovating the Future</p>
                            </div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                            <p>Bengaluru, Karnataka, India</p>
                            <p>contactus.techastra@gmail.com</p>
                            <p>+91 74833 34990</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h2 className="text-center text-2xl font-bold underline mb-8 uppercase">Project Agreement</h2>

                        <p className="mb-6">
                            <strong>Date:</strong> {new Date(clientData.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>

                        <p className="mb-6 leading-relaxed">
                            This agreement is made between <strong>TechAstra</strong> (hereinafter referred to as "Service Provider") and <strong>{clientData.clientName || "[Client Name]"}</strong> (hereinafter referred to as "Client").
                        </p>

                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-2">1. Project Details</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Project Title:</strong> {clientData.projectTitle || "[Project Title]"}</li>
                                <li><strong>Description:</strong> {clientData.projectDescription || "[Description of the project scope and deliverables]"}</li>
                                <li><strong>Duration:</strong> {clientData.duration || "[Duration]"}</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-2">2. Financial Terms</h3>
                            <p>
                                The total cost for the project is agreed to be <strong>₹{clientData.price || "0"}</strong>.
                                Payment shall be made as per the milestones agreed upon separately.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-2">3. Confidentiality</h3>
                            <p>
                                Both parties agree to keep all confidential information shared during the course of this project private and not to disclose it to any third party without prior written consent.
                            </p>
                        </div>
                    </div>

                    {/* Footer / Signatures */}
                    <div className="mt-12 pt-8 border-t border-gray-300 grid grid-cols-2 gap-8">
                        <div>
                            <p className="font-bold mb-12">For TechAstra:</p>
                            <div className="border-t border-black w-3/4"></div>
                            <p className="mt-2 text-sm italic">Authorized Signatory</p>
                        </div>
                        <div>
                            <p className="font-bold mb-12">For Client:</p>
                            <div className="border-t border-black w-3/4"></div>
                            <p className="mt-2 text-sm italic">{clientData.clientName || "Client Name"}</p>
                        </div>
                    </div>

                    {/* Letterhead Footer */}
                    <div className="mt-auto pt-6 text-center text-xs text-gray-400 border-t border-cyan-700/30">
                        <p>TechAstra Solutions • Building Digital Excellence</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgreementGenerator;
