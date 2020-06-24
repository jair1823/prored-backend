import nodemailer from 'nodemailer';
async function sendMail(destiny: string, subject: string, text: string, html: string) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // send mail with defined transport object
    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: destiny,
        subject: subject,
        text: text,
        html: html,
    };

    const res = transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent')
        }
    });

}

export default sendMail;