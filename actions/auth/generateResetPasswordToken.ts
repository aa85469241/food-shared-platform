"use server";

import prisma from "@/lib/prisma";
import crypto from "crypto"
import { getResetPasswordTokenByUsername } from "./getResetPasswordToken";


export const generateResetPasswordToken = async (
    username: string,
    email: string
) => {
    const token = crypto.randomBytes(32).toString("base64url");
    const today = new Date();
    const expires = new Date(today.setDate(today.getDate() + 1));

    const existingToken = await getResetPasswordTokenByUsername(username);

    if (existingToken) {
        await prisma.resetPasswordToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const resetPasswordToken = await prisma.resetPasswordToken.create({
        data: {
            username,
            email,
            token,
            expires,
        }
    })

    return resetPasswordToken;
}