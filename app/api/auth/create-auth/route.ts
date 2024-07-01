import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const user = await currentUser();

    if (!user || user === null) {
        return new NextResponse("User not found.", { status: 401 });
    }

    await prisma.profile.create({
        data: {
            userId: user.id,
            name: `${user.username}`,
            imageUrl: user.imageUrl,
            firstName: "GUEST",
            lastName: `${user.id.slice(-6)}`,
            birth: new Date().toUTCString(),
            description: "This guy is too lazy to post.",
        }
    })

    return NextResponse.redirect(`${process.env.NEXT_APP_PUBLIC_URL}`);
}