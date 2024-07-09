import nodemailer from 'nodemailer';
import config from '../config';

const tranport = nodemailer.createTransport(config.mail);

interface MailOptions {
	from: string;
	to: string;
	subject: string;
	html: string;
}

async function sendMail(mailOptions: MailOptions) {
	try {
		await tranport.sendMail(mailOptions);
	} catch(err) {
		return 'Could not send email.';
	}
}

export async function sendRegConfirm(to: string, token: string) {
	const confirmLink = `http://localhost:3000/auth/confirm?token=${token}`;
	const opt: MailOptions = {
		from: 'noreply@app.ru',
		to,
		subject: 'Registration confirmation',
		html: `<p>Please confirm your registration by clicking on the link:</p> <p><a href="${confirmLink}">confirm</a></p>`
	}
	sendMail(opt)
}

export async function sendPassResetConfirm(to: string, token: string) {
	const confirmLink = `http://localhost:3000/auth/confirm?token=${token}`;
	const opt: MailOptions = {
		from: 'noreply@app.ru',
		to,
		subject: 'Password reset confirmation',
		html: `<p>Please confirm your password reset by clicking on the link:</p> <p><a href="${confirmLink}">confirm</a></p>`
	}
	sendMail(opt)
}