export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const authTokenSecret = process.env.AUTH_TOKEN_SECRET;

export const smtpUsername = process.env.SMTP_USERNAME;
export const smtppassword = process.env.SMTP_PASSWORD;
export const smtpHost = process.env.SMTP_HOST;

export const sendEmails = process.env.SEND_EMAILS === '1';