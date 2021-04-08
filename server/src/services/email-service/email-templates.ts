import { sendEmail } from './email-service';

export const sendLoginLinkEmail = ({ email, token }: { email:string, token:string }) => {
  // tslint:disable
  console.log(11111, email, token);
  return sendEmail({
    email,
    subject: 'Your Login Link',
    messageText: `Go to http://localhost:8080/authenticate?token=${token}`,
  });
}