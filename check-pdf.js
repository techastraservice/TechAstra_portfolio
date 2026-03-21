import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function test() {
    try {
        const bytes = fs.readFileSync('public/TECH ASTRA-1.pdf');
        const pdfDoc = await PDFDocument.load(bytes);
        console.log("PDF loaded successfully.");
        
        // Let's test the page copying logic
        console.log(`Original pages: ${pdfDoc.getPageCount()}`);
        const extraPages = await pdfDoc.copyPages(pdfDoc, [0, 0]);
        for (const p of extraPages) pdfDoc.addPage(p);
        console.log(`Pages after copy: ${pdfDoc.getPageCount()}`);
        
        // Let's save it
        const saved = await pdfDoc.save();
        console.log(`Saved bytes: ${saved.length}`);
    } catch (e) {
        console.error("ERROR:");
        console.error(e);
    }
}
test();
