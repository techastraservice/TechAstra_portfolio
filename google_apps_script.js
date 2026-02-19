/* eslint-disable */
function doPost(e) {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        var data = e.parameter;
        var name = data.name;
        var userEmail = data.email;
        var subject = data.subject || "New Contact Form Submission";
        var message = data.message;

        // 1. Send Email to Admin (You)
        var adminEmail = "contactus.techastra@gmail.com";
        var adminBody = "Name: " + name + "\n" +
            "Email: " + userEmail + "\n" +
            "Subject: " + subject + "\n\n" +
            "Message:\n" + message;

        MailApp.sendEmail({
            to: adminEmail,
            subject: "New Contact: " + subject,
            body: adminBody,
            replyTo: userEmail
        });

        // 2. Send Confirmation Email to User
        var userBody = "Hi " + name + ",\n\n" +
            "Thank you for approaching TechAstra! " +
            "We have received your message and will get back to you soon.\n\n" +
            "Best Regards,\n" +
            "Team TechAstra";

        MailApp.sendEmail({
            to: userEmail,
            subject: "Thank you for contacting TechAstra",
            body: userBody
        });

        return ContentService
            .createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}
