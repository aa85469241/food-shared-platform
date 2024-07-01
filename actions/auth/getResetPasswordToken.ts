"use server";

import prisma from "@/lib/prisma";

export const getResetPasswordTokenByUsername = async (username: string) => {
    try {
        const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
            where: {
                username: username
            }
        })

        return resetPasswordToken;
    }
    catch (err) {
        return null;
    }
}

export const getResetPasswordTokenByToken = async (token: string) => {
    try {
        const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
            where: {
                token: token
            }
        })

        return resetPasswordToken;
    }
    catch (err) {
        return null;
    }
}