'use server';

import prisma from "@/lib/prisma";
import { ResetSchemaValues } from "@/app/(auth)/auth/forgot-password/page";
import { ResetSchema } from "@/lib/schema";
import { generateResetPasswordToken } from "./generateResetPasswordToken";
import { sendResetPasswordEmail } from "@/lib/send";


export const resetPassword = async (values: ResetSchemaValues) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { errors: "Invalid fields." };
    }

    const { username, email } = validatedFields.data;

    const existingUser = await prisma.profile.findUnique({
        where: {
            name: username
        }
    })

    if (!existingUser) {
        return { error: "User not found." };
    }

    const resetPasswordToken = await generateResetPasswordToken(
        username,
        email
    );

    await sendResetPasswordEmail(
        existingUser.name,
        resetPasswordToken.email,
        resetPasswordToken.token,
    )

    return { success: "Reset email sent." }
}