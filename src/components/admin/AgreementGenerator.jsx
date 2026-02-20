import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, FileText, Loader2 } from 'lucide-react';
import logo from '../../assets/techastra-logo.png';
import { database } from '../../firebaseConfig';
import { ref, push } from 'firebase/database';

const AgreementGenerator = () => {
    const [clientData, setClientData] = useState({
        clientName: '',
        clientAddress: '',
        clientEmail: '',
        clientPhone: '',
        projectTitle: '',
        duration: '1 Month',
        priceWithoutResource: '',
        priceWithResource: '',
        deliverables: '',
        startDate: new Date().toISOString().split('T')[0]
    });
    const [generating, setGenerating] = useState(false);
    const agreementRef = useRef();

    const handleChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    };

    const handlePrint = useReactToPrint({
        contentRef: agreementRef,
        documentTitle: `${clientData.clientName ? clientData.clientName.replace(/\s+/g, '_') : 'Client'}_Agreement`,
        onAfterPrint: () => setGenerating(false)
    });

    const generatePDF = async () => {
        setGenerating(true);
        // Trigger print dialog immediately
        handlePrint();

        try {
            // Save to Database in the background
            const clientsRef = ref(database, 'clients');
            await push(clientsRef, {
                ...clientData,
                status: 'Pending',
                generatedAt: Date.now()
            });
        } catch (error) {
            console.error("Error saving client:", error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full">
            {/* Form Section */}
            <div className="w-full lg:w-1/3 bg-[#0f0f16]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
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
                            placeholder="Enter the client name "
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">CLIENT ADDRESS</label>
                        <input
                            type="text"
                            name="clientAddress"
                            value={clientData.clientAddress}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                            placeholder="Client address"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">CLIENT EMAIL</label>
                            <input
                                type="email"
                                name="clientEmail"
                                value={clientData.clientEmail}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                                placeholder="client@gmail.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">CLIENT PHONE</label>
                            <input
                                type="text"
                                name="clientPhone"
                                value={clientData.clientPhone}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                                placeholder="Mobile Number"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">PROJECT TITLE / PHASE</label>
                        <input
                            type="text"
                            name="projectTitle"
                            value={clientData.projectTitle}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                            placeholder="Project Title"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">DELIVERABLES</label>
                        <textarea
                            name="deliverables"
                            value={clientData.deliverables}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none h-32 resize-none custom-scrollbar"
                            placeholder="List deliverables here..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">PRICE (Without Res.) ₹</label>
                            <input
                                type="text"
                                name="priceWithoutResource"
                                value={clientData.priceWithoutResource}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                                placeholder="Price"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">PRICE (With Res.) ₹</label>
                            <input
                                type="text"
                                name="priceWithResource"
                                value={clientData.priceWithResource}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                                placeholder="25000"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">DURATION</label>
                            <input
                                type="text"
                                name="duration"
                                value={clientData.duration}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none"
                                placeholder="1 Month"
                            />
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
            <div className="w-full lg:w-2/3 bg-gray-200/50 rounded-2xl p-4 overflow-y-auto max-h-[calc(100vh-200px)] flex justify-center custom-scrollbar">
                <style>
                    {`
                        @media print {
                            @page {
                                size: A4 portrait;
                                margin: 15mm;
                            }
                            body { 
                                -webkit-print-color-adjust: exact; 
                                print-color-adjust: exact; 
                                margin: 0;
                            }
                            #agreement-content {
                                width: 100% !important;
                                height: auto !important;
                                min-height: 0 !important;
                                padding: 0 !important;
                                margin: 0 !important;
                                box-shadow: none !important;
                            }
                            /* Allow normal layout inside the container for print */
                            #agreement-content > * {
                                page-break-inside: auto;
                            }
                            .page-break { page-break-before: always; }
                            .avoid-break { break-inside: avoid; page-break-inside: avoid; }
                        }
                    `}
                </style>
                <div
                    ref={agreementRef}
                    id="agreement-content"
                    className="bg-white text-black w-[210mm] min-h-[297mm] p-[20mm] shadow-lg relative flex flex-col text-[10pt] leading-normal"
                    style={{ fontFamily: "'Arial', sans-serif" }}
                >
                    {/* Letterhead Header */}
                    <div className="flex justify-between items-center border-b-2 border-cyan-700 pb-4 mb-6">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="TechAstra" className="w-16 h-16 object-contain" />
                            <div>
                                <h1 className="text-2xl font-bold text-cyan-800 tracking-wide">TechAstra</h1>
                                <p className="text-[10px] text-gray-600 tracking-widest uppercase">Innovating the Future</p>
                            </div>
                        </div>
                        <div className="text-right text-xs text-gray-600">
                            <p>Bengaluru, Karnataka, India</p>
                            <p>contactus.techastra@gmail.com</p>
                            <p>+91 74833 34990</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                        <h2 className="text-center text-xl font-bold underline uppercase mb-4">Software Development Agreement</h2>

                        <div className="flex justify-between mb-2">
                            <div>
                                <p><strong>Client Name:</strong> {clientData.clientName || "[Client Name]"}</p>
                                <p><strong>Address:</strong> {clientData.clientAddress || "[Address]"}</p>
                            </div>
                            <div className="text-right">
                                <p><strong>Date:</strong> {new Date(clientData.startDate).toLocaleDateString('en-GB')}</p>
                                <p><strong>Email:</strong> {clientData.clientEmail || "[Email]"}</p>
                                <p><strong>Phone:</strong> {clientData.clientPhone || "[Phone]"}</p>
                            </div>
                        </div>

                        <hr className="border-gray-300 my-2" />

                        <div>
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">1. PROJECT SCOPE & DELIVERABLES</h3>
                            <p><strong>Phase/Project Name:</strong> {clientData.projectTitle || "[Project Title]"}</p>
                            <p><strong>Project Duration:</strong> {clientData.duration || "[Duration]"}</p>
                            <p className="mt-1"><strong>Project Cost:</strong></p>
                            <ul className="list-disc pl-5 mb-2">
                                <li>₹{clientData.priceWithoutResource || "[0]"} (without resources)</li>
                                <li>₹{clientData.priceWithResource || "[0]"} (with resources)</li>
                            </ul>

                            <p className="font-semibold underline mt-2 mb-1">A. Deliverables:</p>
                            <div className="pl-2 whitespace-pre-wrap text-sm">
                                {clientData.deliverables || "[Deliverables]"}
                            </div>

                            <p className="font-semibold underline mt-2 mb-1">B. What's Included:</p>
                            <ul className="list-disc pl-5 mb-2">
                                <li>Source code delivery</li>
                                <li>Basic testing and debugging</li>
                                <li>1 month post-delivery support for bug fixes</li>
                                <li>Setup assistance (remote)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">2. CLIENT RESPONSIBILITIES</h3>
                            <ul className="list-disc pl-5">
                                <li>Provide subject-wise syllabus, question samples, or formats if required</li>
                                <li>Timely feedback during development phases</li>
                                <li>Provide branding materials (logo, color palette)</li>
                                <li>Timely approval and testing within stipulated period</li>
                                <li>Grant access to domain panel (if purchasing independently)</li>
                            </ul>
                        </div>

                        <div className="avoid-break mb-4 pt-2">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">3. PAYMENT TERMS</h3>
                            <p className="font-semibold mt-1">Advance Payment (Before Start):</p>
                            <ul className="list-disc pl-5">
                                <li>₹{clientData.priceWithoutResource ? (Number(clientData.priceWithoutResource) / 2).toFixed(0) : "[50%]"} (Without Resource)</li>
                                <li>₹{clientData.priceWithResource ? (Number(clientData.priceWithResource) / 2).toFixed(0) : "[50%]"} (With Resource)</li>
                            </ul>
                            <p className="font-semibold mt-1">Final Payment (Upon Completion & Acceptance):</p>
                            <ul className="list-disc pl-5">
                                <li>₹{clientData.priceWithoutResource ? (Number(clientData.priceWithoutResource) / 2).toFixed(0) : "[50%]"} (Without Resource)</li>
                                <li>₹{clientData.priceWithResource ? (Number(clientData.priceWithResource) / 2).toFixed(0) : "[50%]"} (With Resource)</li>
                            </ul>
                            <p className="mt-1"><strong>Accepted Methods:</strong> UPI / Bank Transfer / Cash. Final Invoice with Payment Breakdown will be provided.</p>
                        </div>

                        <div className="avoid-break mb-4 pt-2">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">4. DEVELOPMENT TIMELINE</h3>
                            <ul className="list-disc pl-5">
                                <li>Develop the solution according to the agreed functionality</li>
                                <li>Provide source code upon full payment</li>
                                <li>Deploy the application (on resource-provided server)</li>
                                <li>1-month post-delivery support for bug fixes</li>
                                <li>Respond to minor content or UI corrections</li>
                            </ul>
                        </div>

                        <div className="avoid-break mb-4 pt-2">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">5. INTELLECTUAL PROPERTY RIGHTS</h3>
                            <ul className="list-disc pl-5">
                                <li><strong>Source Code:</strong> Full ownership transfers to Client upon final payment</li>
                                <li><strong>Custom Development:</strong> All custom code developed becomes Client's property</li>
                                <li><strong>Third-party Libraries:</strong> Open-source libraries remain under their respective licenses</li>
                                <li><strong>Developer Tools:</strong> Developer retains rights to general methodologies and techniques</li>
                            </ul>
                        </div>

                        <div className="avoid-break mb-4 pt-2">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">6. LIMITATIONS & EXCLUSIONS</h3>
                            <p className="font-semibold">Not Included in Base Price:</p>
                            <ul className="list-disc pl-5 mb-1">
                                <li>Complex AI/ML modeling unless specifically mentioned</li>
                                <li>Mobile app version</li>
                                <li>Third-party service costs (SMS, email services)</li>
                                <li>High-availability cloud optimization</li>
                                <li>Post-1-month support unless extended by contract</li>
                            </ul>
                            <p className="font-semibold">Technical Limitations:</p>
                            <ul className="list-disc pl-5">
                                <li>WhatsApp API rate limits apply</li>
                                <li>Basic error handling and logging</li>
                                <li>Standard security measures only</li>
                                <li>Limited customization of UI themes</li>
                            </ul>
                        </div>

                        <div className="avoid-break page-break mb-4 pt-4">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">7. SUPPORT & MAINTENANCE</h3>
                            <p><strong>Included Support (1 Month):</strong> Bug fixes for delivered functionality, Minor adjustments and tweaks, Setup and deployment assistance, Email/phone support during business hours.</p>
                            <p><strong>Post-Support Period:</strong> Additional support based on the complexity of issues. Major feature additions will require separate agreement.</p>
                        </div>

                        <div className="avoid-break mb-4 pt-2">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">8. TESTING & ACCEPTANCE</h3>
                            <p><strong>Testing Process:</strong> Developer testing during development, Client User Acceptance Testing (UAT) period: 1 week, Bug fixes during UAT included in base price, Client must provide feedback within testing period.</p>
                            <p><strong>Acceptance Criteria:</strong> All deliverables meet specified requirements, System functions as demonstrated, No critical bugs affecting core functionality, Documentation provided and reviewed.</p>
                        </div>

                        <div className="avoid-break mb-4 pt-2">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">9. CONFIDENTIALITY</h3>
                            <p>Both parties agree to: Keep all project information confidential, Not disclose business processes or technical details, Protect customer data and business information, Return or destroy confidential information upon request.</p>
                        </div>

                        <div className="avoid-break mb-4 pt-2">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">10. LIABILITY & WARRANTIES</h3>
                            <p><strong>Developer Warranties:</strong> Code will be free from major bugs at delivery, Will use industry-standard development practices, Will deliver within agreed timeline (subject to client cooperation).</p>
                            <p><strong>Liability Limitations:</strong> Total liability limited to project cost, No liability for business losses or consequential damages, No warranty on third-party service availability, Client responsible for data backup and security.</p>
                        </div>

                        <div className="avoid-break mb-4 pt-2">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">11. TERMINATION CLAUSES</h3>
                            <p><strong>Termination by Client:</strong> 7 days written notice required, Payment for work completed till termination date, Source code delivered for paid portions.</p>
                            <p><strong>Termination by Developer:</strong> In case of non-payment beyond 7 days, If client fails to provide necessary cooperation, 7 days written notice required.</p>
                        </div>

                        <div className="avoid-break mb-4 pt-2">
                            <h3 className="font-bold text-sm bg-gray-100 p-1 mb-1">12. ADDITIONAL TERMS</h3>
                            <ol className="list-decimal pl-5">
                                <li><strong>Force Majeure:</strong> Neither party liable for delays due to circumstances beyond control</li>
                                <li><strong>Modifications:</strong> Any changes to scope require written agreement and may involve additional costs</li>
                                <li><strong>Governing Law:</strong> This agreement governed by Indian laws</li>
                                <li><strong>Severability:</strong> If any clause is invalid, remainder of contract remains valid</li>
                                <li><strong>Communication:</strong> All official communication via email with acknowledgment</li>
                            </ol>
                        </div>

                        <p className="italic text-center mt-4 text-xs font-semibold">
                            This agreement is executed in duplicate, with each party retaining one original copy.<br />
                            Note: Please review all terms carefully and consult legal counsel if needed before signing.
                        </p>
                    </div>

                    {/* Footer / Signatures */}
                    <div className="mt-12 pt-6 pb-6 border-t border-gray-300 grid grid-cols-2 gap-8 avoid-break">
                        <div>
                            <p className="font-bold mb-8">For TechAstra:</p>
                            <div className="border-t border-black w-3/4"></div>
                            <p className="mt-1 text-xs italic">Authorized Signatory</p>
                        </div>
                        <div>
                            <p className="font-bold mb-8">For Client:</p>
                            <div className="border-t border-black w-3/4"></div>
                            <p className="mt-1 text-xs italic">{clientData.clientName || "Client Name"}</p>
                        </div>
                    </div>

                    {/* Letterhead Footer */}
                    <div className="mt-auto pt-4 text-center text-[10px] text-gray-400 border-t border-cyan-700/30">
                        <p>TechAstra Solutions • Building Digital Excellence</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgreementGenerator;
