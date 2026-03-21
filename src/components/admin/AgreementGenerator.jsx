import React, { useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { database } from '../../firebaseConfig';
import { ref, push } from 'firebase/database';
import { logAdminAction } from '../../utils/logger';

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

    const handleChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    };

    const generatePDF = async () => {
        setGenerating(true);
        try {
            // ── Load template PDF ────────────────────────────────────────────────
            const templateBytes = await fetch('/TECH ASTRA-1.pdf').then(r => r.arrayBuffer());
            const pdfDoc = await PDFDocument.load(templateBytes);

            // Pre-add 2 extra template pages (total = 3 pages max)
            const extraPages = await pdfDoc.copyPages(pdfDoc, [0, 0]);
            for (const p of extraPages) pdfDoc.addPage(p);

            const docPages = pdfDoc.getPages();
            const { width, height } = docPages[0].getSize();

            // Content boundaries (safe area between header and footer)
            const CONTENT_TOP = height - 200; // Increased top margin to clear letterhead divider
            const CONTENT_BOTTOM = 115;

            let currentPageIdx = 0;
            let currentPage = docPages[0];
            let y = CONTENT_TOP;

            // ── Fonts & Colors ───────────────────────────────────────────────────
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

            const black = rgb(0, 0, 0);
            const darkGray = rgb(0.25, 0.25, 0.25);
            const lightGray = rgb(0.75, 0.75, 0.75);
            const cyan = rgb(0, 0.76, 1);
            const purple = rgb(0.54, 0, 1);
            const margin = 60;

            // ── Page helpers ─────────────────────────────────────────────────────
            const nextPage = () => {
                currentPageIdx++;
                if (currentPageIdx < docPages.length) {
                    currentPage = docPages[currentPageIdx];
                    y = CONTENT_TOP;
                }
            };

            const checkPageBreak = (neededSpace = 15) => {
                if (y - neededSpace < CONTENT_BOTTOM) nextPage();
            };

            // ── Drawing helpers ──────────────────────────────────────────────────
            const wrapText = (text, maxWidth, fontSize, fontObj) => {
                const words = String(text || '').split(' ');
                let lines = [];
                let currentLine = '';

                for (let i = 0; i < words.length; i++) {
                    const testLine = currentLine + words[i] + ' ';
                    const width = fontObj.widthOfTextAtSize(testLine, fontSize);
                    if (width > maxWidth && i > 0) {
                        lines.push(currentLine.trim());
                        currentLine = words[i] + ' ';
                    } else {
                        currentLine = testLine;
                    }
                }
                lines.push(currentLine.trim());
                return lines;
            };

            const draw = (text, x, yPos, opts = {}) => {
                const f = opts.bold ? bold : font;
                const s = opts.size || 9;
                const maxWidth = width - margin - x; // Max width available for this text

                if (maxWidth > 100) {
                    const lines = wrapText(text, maxWidth, s, f);
                    let currentY = yPos;
                    for (let i = 0; i < lines.length; i++) {
                        currentPage.drawText(lines[i], {
                            x, y: currentY,
                            size: s, font: f, color: opts.color || black,
                        });
                        if (i < lines.length - 1) {
                            currentY -= s * 1.5; // Line height for wrapped lines
                            y -= s * 1.5; // push global y tracker down
                        }
                    }
                } else {
                    currentPage.drawText(String(text || '').substring(0, 250), {
                        x, y: yPos, size: s, font: f, color: opts.color || black,
                    });
                }
            };

            const drawHLine = (yPos, color = lightGray, thickness = 0.5) => {
                currentPage.drawLine({
                    start: { x: margin, y: yPos },
                    end: { x: width - margin, y: yPos },
                    thickness, color
                });
            };

            const drawSection = (title, barColor = cyan) => {
                checkPageBreak(22);
                draw(title, margin, y + 1, { bold: true, size: 9 });
                y -= 14;
            };

            const drawBullet = (text, indent = 14, size = 8.5) => {
                checkPageBreak(13);
                draw(`\u2022  ${text}`, margin + indent, y, { size });
                y -= 11;
            };

            const drawSubBullet = (text, indent = 24, size = 8.5) => {
                checkPageBreak(13);
                draw(`-  ${text}`, margin + indent, y, { size });
                y -= 11;
            };

            const drawLabel = (text, indent = 8, size = 8.5, isBold = false) => {
                checkPageBreak(13);
                draw(text, margin + indent, y, { size, bold: isBold });
                y -= 11;
            };

            // ════════════════════════════════════════════════════════════════════
            // TITLE
            // ════════════════════════════════════════════════════════════════════
            const title = 'SOFTWARE DEVELOPMENT AGREEMENT';
            const tw = bold.widthOfTextAtSize(title, 11);
            const titleX = (width - tw) / 2;
            draw(title, titleX, y, { bold: true, size: 11 });
            y -= 4;
            currentPage.drawLine({ start: { x: titleX, y }, end: { x: titleX + tw, y }, thickness: 0.5, color: black });
            y -= 16;

            // ════════════════════════════════════════════════════════════════════
            // CLIENT INFO BLOCK
            // ════════════════════════════════════════════════════════════════════
            checkPageBreak(50);
            const rightColX = width - margin - 150;

            draw('Client Name:', margin, y, { bold: true, size: 9 });
            draw(clientData.clientName || '________________', margin + 68, y, { size: 9 });
            draw('Date:', rightColX, y, { bold: true, size: 9 });
            draw(new Date(clientData.startDate).toLocaleDateString('en-GB'), rightColX + 32, y, { size: 9 });
            y -= 13;
            draw('Address:', margin, y, { bold: true, size: 9 });
            draw(clientData.clientAddress || '________________', margin + 50, y, { size: 9 });
            draw('Email:', rightColX, y, { bold: true, size: 9 });
            draw(clientData.clientEmail || '________________', rightColX + 35, y, { size: 9 });
            y -= 13;
            draw('Phone:', rightColX, y, { bold: true, size: 9 });
            draw(clientData.clientPhone || '________________', rightColX + 38, y, { size: 9 });
            y -= 8;
            drawHLine(y);
            y -= 12;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 1: PROJECT SCOPE & DELIVERABLES
            // ════════════════════════════════════════════════════════════════════
            drawSection('1. PROJECT SCOPE & DELIVERABLES', cyan);
            drawLabel(`Phase/Project Name: ${clientData.projectTitle || '________________'}`);
            drawLabel(`Project Duration: ${clientData.duration || '1 Month'}`);
            drawLabel('Project Cost:', 8, 8.5, true);
            drawBullet(`Rs.${clientData.priceWithoutResource || '0'} (without resources)`, 18);
            drawBullet(`Rs.${clientData.priceWithResource || '0'} (with resources)`, 18);

            drawLabel('A. Deliverables:', 8, 8.5, true);
            const delivLines = (clientData.deliverables || '').trim().split('\n').filter(Boolean);
            if (delivLines.length > 0) {
                for (const line of delivLines) drawBullet(line.replace(/^[-•*●]\s*/, ''), 18);
            } else {
                drawLabel('[Not specified]', 18, 8.5);
            }

            drawLabel("B. What's Included:", 8, 8.5, true);
            drawBullet('Source code delivery', 18);
            drawBullet('Basic testing and debugging', 18);
            drawBullet('1 month post-delivery support for bug fixes', 18);
            drawBullet('Setup assistance (remote)', 18);
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 2: CLIENT RESPONSIBILITIES
            // ════════════════════════════════════════════════════════════════════
            drawSection('2. CLIENT RESPONSIBILITIES', purple);
            drawBullet('Provide subject-wise syllabus, question samples, or formats if required');
            drawBullet('Timely feedback during development phases');
            drawBullet('Provide branding materials (logo, color palette)');
            drawBullet('Timely approval and testing within stipulated period');
            drawBullet('Grant access to domain panel (if purchasing independently)');
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 3: PAYMENT TERMS
            // ════════════════════════════════════════════════════════════════════
            drawSection('3. PAYMENT TERMS', cyan);
            const half1 = clientData.priceWithoutResource ? (Number(clientData.priceWithoutResource) / 2).toFixed(0) : '\u2014';
            const half2 = clientData.priceWithResource ? (Number(clientData.priceWithResource) / 2).toFixed(0) : '\u2014';
            drawLabel('Advance Payment (Before Start):', 8, 8.5, true);
            drawSubBullet(`Rs.${half1} (Without Resource)`);
            drawSubBullet(`Rs.${half2} (With Resource)`);
            drawLabel('Final Payment (Upon Completion & Acceptance):', 8, 8.5, true);
            drawSubBullet(`Rs.${half1} (Without Resource)`);
            drawSubBullet(`Rs.${half2} (With Resource)`);
            drawLabel('Accepted Methods:', 8, 8.5, true);
            drawBullet('UPI / Bank Transfer / Cash', 18);
            drawBullet('Final Invoice with Payment Breakdown will be provided.', 18);
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 4: DEVELOPMENT TIMELINE
            // ════════════════════════════════════════════════════════════════════
            drawSection('4. DEVELOPMENT TIMELINE', purple);
            drawBullet('Develop the solution according to the agreed functionality');
            drawBullet('Provide source code upon full payment');
            drawBullet('Deploy the application (on resource-provided server)');
            drawBullet('1-month post-delivery support for bug fixes');
            drawBullet('Respond to minor content or UI corrections');
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 5: INTELLECTUAL PROPERTY RIGHTS
            // ════════════════════════════════════════════════════════════════════
            drawSection('5. INTELLECTUAL PROPERTY RIGHTS', cyan);
            drawBullet('Source Code: Full ownership transfers to Client upon final payment');
            drawBullet("Custom Development: All custom code developed becomes Client's property");
            drawBullet('Third-party Libraries: Open-source libraries remain under their respective licenses');
            drawBullet('Developer Tools: Developer retains rights to general methodologies and techniques');
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 6: LIMITATIONS & EXCLUSIONS
            // ════════════════════════════════════════════════════════════════════
            drawSection('6. LIMITATIONS & EXCLUSIONS', purple);
            drawLabel('Not Included in Base Price:', 8, 8.5, true);
            drawBullet('Complex AI/ML modeling unless specifically mentioned', 18);
            drawBullet('Mobile app version', 18);
            drawBullet('Third-party service costs (SMS, email services)', 18);
            drawBullet('High-availability cloud optimization', 18);
            drawBullet('Post-1-month support unless extended by contract', 18);
            drawLabel('Technical Limitations:', 8, 8.5, true);
            drawBullet('WhatsApp API rate limits apply', 18);
            drawBullet('Basic error handling and logging', 18);
            drawBullet('Standard security measures only', 18);
            drawBullet('Limited customization of UI themes', 18);
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 7: SUPPORT & MAINTENANCE
            // ════════════════════════════════════════════════════════════════════
            drawSection('7. SUPPORT & MAINTENANCE', cyan);
            drawLabel('Included Support (1 Month):', 8, 8.5, true);
            drawBullet('Bug fixes for delivered functionality', 18);
            drawBullet('Minor adjustments and tweaks', 18);
            drawBullet('Setup and deployment assistance', 18);
            drawBullet('Email/phone support during business hours', 18);
            drawLabel('Post-Support Period:', 8, 8.5, true);
            drawBullet('Additional support based on the complexity of issues.', 18);
            drawBullet('Major feature additions will require separate agreement.', 18);
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 8: TESTING & ACCEPTANCE
            // ════════════════════════════════════════════════════════════════════
            drawSection('8. TESTING & ACCEPTANCE', purple);
            drawLabel('Testing Process:', 8, 8.5, true);
            drawBullet('Developer testing during development', 18);
            drawBullet('Client User Acceptance Testing (UAT) period: 1 week', 18);
            drawBullet('Bug fixes during UAT included in base price', 18);
            drawBullet('Client must provide feedback within testing period', 18);
            drawLabel('Acceptance Criteria:', 8, 8.5, true);
            drawBullet('All deliverables meet specified requirements', 18);
            drawBullet('System functions as demonstrated', 18);
            drawBullet('No critical bugs affecting core functionality', 18);
            drawBullet('Documentation provided and reviewed', 18);
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 9: CONFIDENTIALITY
            // ════════════════════════════════════════════════════════════════════
            drawSection('9. CONFIDENTIALITY', cyan);
            drawLabel('Both parties agree to:');
            drawBullet('Keep all project information confidential', 18);
            drawBullet('Not disclose business processes or technical details', 18);
            drawBullet('Protect customer data and business information', 18);
            drawBullet('Return or destroy confidential information upon request', 18);
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 10: LIABILITY & WARRANTIES
            // ════════════════════════════════════════════════════════════════════
            drawSection('10. LIABILITY & WARRANTIES', purple);
            drawLabel('Developer Warranties:', 8, 8.5, true);
            drawBullet('Code will be free from major bugs at delivery', 18);
            drawBullet('Will use industry-standard development practices', 18);
            drawBullet('Will deliver within agreed timeline (subject to client cooperation)', 18);
            drawLabel('Liability Limitations:', 8, 8.5, true);
            drawBullet('Total liability limited to project cost', 18);
            drawBullet('No liability for business losses or consequential damages', 18);
            drawBullet('No warranty on third-party service availability', 18);
            drawBullet('Client responsible for data backup and security', 18);
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 11: TERMINATION CLAUSES
            // ════════════════════════════════════════════════════════════════════
            drawSection('11. TERMINATION CLAUSES', cyan);
            drawLabel('Termination by Client:', 8, 8.5, true);
            drawBullet('7 days written notice required', 18);
            drawBullet('Payment for work completed till termination date', 18);
            drawBullet('Source code delivered for paid portions', 18);
            drawLabel('Termination by Developer:', 8, 8.5, true);
            drawBullet('In case of non-payment beyond 7 days', 18);
            drawBullet('If client fails to provide necessary cooperation', 18);
            drawBullet('7 days written notice required', 18);
            y -= 4;

            // ════════════════════════════════════════════════════════════════════
            // SECTION 12: ADDITIONAL TERMS
            // ════════════════════════════════════════════════════════════════════
            drawSection('12. ADDITIONAL TERMS', purple);
            drawLabel('1. Force Majeure: Neither party liable for delays due to circumstances beyond control');
            drawLabel('2. Modifications: Any changes to scope require written agreement and may involve additional costs');
            drawLabel('3. Governing Law: This agreement governed by Indian laws');
            drawLabel('4. Severability: If any clause is invalid, remainder of contract remains valid');
            drawLabel('5. Communication: All official communication via email with acknowledgment');
            y -= 8;

            // ════════════════════════════════════════════════════════════════════
            // CLOSING NOTE
            // ════════════════════════════════════════════════════════════════════
            checkPageBreak(25);
            draw('This agreement is executed in duplicate, with each party retaining one original copy.', margin, y, { size: 7.5, color: darkGray });
            y -= 11;
            draw('Note: Please review all terms carefully and consult legal counsel if needed before signing.', margin, y, { size: 7.5, color: darkGray });
            y -= 22;

            // ════════════════════════════════════════════════════════════════════
            // SIGNATURES
            // ════════════════════════════════════════════════════════════════════
            checkPageBreak(65);
            drawHLine(y, lightGray, 0.5);
            y -= 30;
            draw('For TechAstra:', margin, y, { bold: true, size: 9 });
            draw('For Client:', width / 2 + 10, y, { bold: true, size: 9 });
            y -= 36;
            currentPage.drawLine({ start: { x: margin, y }, end: { x: margin + 130, y }, thickness: 0.8, color: black });
            currentPage.drawLine({ start: { x: width / 2 + 10, y }, end: { x: width / 2 + 150, y }, thickness: 0.8, color: black });
            y -= 10;
            draw('Authorized Signatory', margin, y, { size: 8, color: darkGray });
            draw(clientData.clientName || 'Client Name', width / 2 + 10, y, { size: 8, color: darkGray });

            // ── Remove unused template pages ─────────────────────────────────────
            const usedPages = currentPageIdx + 1;
            const totalPages = docPages.length;
            for (let i = totalPages - 1; i >= usedPages; i--) {
                pdfDoc.removePage(i);
            }

            // ── Save & Download ──────────────────────────────────────────────────
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${(clientData.clientName || 'Client').replace(/\s+/g, '_')}_Agreement.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // ── Save to Firebase ─────────────────────────────────────────────────
            const clientsRef = ref(database, 'clients');
            const newClientData = { ...clientData, status: 'Pending', generatedAt: Date.now() };
            await push(clientsRef, newClientData);
            await logAdminAction('Generated Agreement', 'Agreement/Client', clientData.clientName, newClientData);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
        setGenerating(false);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full">

            {/* ── Form Panel ── */}
            <div className="w-full lg:w-1/3 bg-[#0f0f16]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FileText className="text-cyan-500" />
                    Agreement Details
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">CLIENT NAME</label>
                        <input type="text" name="clientName" value={clientData.clientName} onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none" placeholder="Enter client name" />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">CLIENT ADDRESS</label>
                        <input type="text" name="clientAddress" value={clientData.clientAddress} onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none" placeholder="Client address" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">PHONE</label>
                            <input type="text" name="clientPhone" value={clientData.clientPhone} onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none" placeholder="Mobile" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">EMAIL</label>
                            <input type="email" name="clientEmail" value={clientData.clientEmail} onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none" placeholder="client@gmail.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">PROJECT TITLE / PHASE</label>
                        <input type="text" name="projectTitle" value={clientData.projectTitle} onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none" placeholder="Project Title" />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">DELIVERABLES <span className="text-gray-600">(one per line)</span></label>
                        <textarea name="deliverables" value={clientData.deliverables} onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none h-32 resize-none custom-scrollbar"
                            placeholder={"User-friendly Web Interface\nAI-Based Question Paper Generation\nPDF Export & Download"} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">PRICE (No Res.) ₹</label>
                            <input type="text" name="priceWithoutResource" value={clientData.priceWithoutResource} onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none" placeholder="20000" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">PRICE (With Res.) ₹</label>
                            <input type="text" name="priceWithResource" value={clientData.priceWithResource} onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none" placeholder="25000" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">DURATION</label>
                            <input type="text" name="duration" value={clientData.duration} onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none" placeholder="1 Month" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">START DATE</label>
                            <input type="date" name="startDate" value={clientData.startDate} onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none" />
                        </div>
                    </div>

                    <button onClick={generatePDF} disabled={generating || !clientData.clientName}
                        className="w-full btn-primary mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
                        {generating ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                        {generating ? 'Generating...' : 'Download PDF'}
                    </button>
                    <p className="text-xs text-gray-600 text-center">
                        Agreement stamped on official TECH ASTRA letterhead · Multi-page supported
                    </p>
                </div>
            </div>

            {/* ── Preview: Canva Template ── */}
            <div className="w-full lg:w-2/3 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
                <div className="bg-[#0f0f16]/80 border-b border-white/10 px-4 py-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <span className="text-xs font-mono text-gray-400">TECH ASTRA — Official Letterhead Template Preview</span>
                </div>
                <iframe
                    loading="lazy"
                    style={{ width: '100%', height: 'calc(100% - 36px)', border: 'none' }}
                    src="https://www.canva.com/design/DAHDmwLojr0/wlJF91L0fxcBWJ-ZSuCGww/view?embed"
                    allowFullScreen
                    allow="fullscreen"
                    title="TECH ASTRA Agreement Template"
                />
            </div>
        </div>
    );
};

export default AgreementGenerator;
