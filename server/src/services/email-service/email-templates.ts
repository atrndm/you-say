import { sendEmail } from './email-service';

export const sendLoginLinkEmail = ({ email, token }: { email:string, token:string }) => {
  // tslint:disable
  console.log(11111, email, token);
  return sendEmail({
    email,
    title: 'Your Login Link',
    message: `Go to http://localhost:8080/authenticate?token=${token}`,
  });
}