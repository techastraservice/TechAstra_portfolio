import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function check() {
    try {
        const pdfBytes = fs.readFileSync('public/TECH ASTRA-1.pdf');
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        console.log('Form fields count:', fields.length);
        fields.forEach(field => {
            console.log(field.getName(), field.constructor.name);
        });
    } catch (err) {
        console.error(err);
    }
}
check();
