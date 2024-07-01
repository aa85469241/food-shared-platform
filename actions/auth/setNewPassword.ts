'use server';

import { NewPasswordSchemaValues } from "@/app/(auth)/auth/new-password/page";
import { NewPasswordSchema } from "@/lib/schema";
import { getResetPasswordTokenByToken } from "./getResetPasswordToken";
import { getUserByUsername } from "./getUserByUsername";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";


export const setNewPassword = async (
    values: NewPasswordSchemaValues,
    token?: string | null
) => {
    if (!token) return { error: "Missing token" };

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields" };

    const { password } = validatedFields.data;

    const existingToken = await getResetPasswordTokenByToken(token);

    if (!existingToken) return { error: "Invalid token" };

    const hasExpires = new Date(existingToken.expires) < new Date();

    if (hasExpires) return { error: "Token has expired" };

    const existingUser = await getUserByUsername(existingToken.username);

    if (!existingUser) return { error: "User not found" };

    await clerkClient.users.updateUser(
        existingUser.userId,
        { password: password }
    )

    await prisma.resetPasswordToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return { success: "Password updated!" };
}