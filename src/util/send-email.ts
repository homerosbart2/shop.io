import Mail from 'nodemailer/lib/mailer';
import { TRANSMITTER_EMAIL } from '../app';

export const sendEmail = (receiverEmail: string, totalAmount: number, transporter: Mail) => {
    const mailOptions = {
        from: TRANSMITTER_EMAIL,
        to: receiverEmail,
        subject: 'Your order has been received.',
        html: `
            <div class="order">
                <div class="brand" style="font-weight: bold; font-size: 46px;">
                    shop<span class="secondary" style="font-size: 30px;">.io</span>
                </div>
                <div class="message">
                    Your <b>$${(totalAmount / 100).toFixed(2)}</b> order has been successfully received.
                </div>
            </div>
        `,
    };

    transporter.sendMail(
        mailOptions,
        (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }
    );
}