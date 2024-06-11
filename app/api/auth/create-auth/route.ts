import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const user = await currentUser();

    if (!user || user === null) {
        return new NextResponse("User not found.", { status: 401 });
    }

    let profile = await prisma.profile.findUnique({
        where: {
            userId: user.id
        }
    })

    if (!profile) {
        await prisma.profile.create({
            data: {
                userId: user.id,
                name: `${user.username}`,
                imageUrl: user.imageUrl,
            }
        })
    }

    return NextResponse.redirect(`${process.env.NEXT_APP_BASE_URL}`)
}