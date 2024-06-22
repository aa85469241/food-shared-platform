import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        if (!params.userId) {
            return new NextResponse("UserId is required.", { status: 401 });
        }

        await clerkClient.users.deleteUser(params.userId);

        const profile = await prisma.profile.delete({
            where: {
                userId: params.userId
            }
        })

        return NextResponse.json(profile);
    }
    catch (err) {
        console.log(["DELETE_USER", err]);
        return new NextResponse("Internet error.", { status: 500 });
    }
}