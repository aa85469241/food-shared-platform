'use server';

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (
    username: string,
    email: string,
    token: string,
) => {
    const resetLink = `${process.env.NEXT_APP_PUBLIC_URL}/auth/new-password?token=${token}&username=${username}`;
    
    await resend.emails.send({
        from: "admin@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    })
}