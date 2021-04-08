import nodemailer from 'nodemailer';
import { smtpUsername, smtppassword, smtpHost } from 'src/config';

export const sendEmail = async ({
  email,
  subject,
  messageText,
}: {
  email: string,
  subject: string,
  messageText: string,
}) => {
  const options = {
    host: smtpHost,
    port: 465,
    secure: true,
    auth: {
      user: smtpUsername,
      pass: smtppassword,
    },
  };
  const transporter = nodemailer.createTransport(options);

  const info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${smtpUsername}>`,
    to: email,
    subject,
    text: messageText,
  });
}