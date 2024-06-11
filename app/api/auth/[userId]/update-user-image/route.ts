import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {

    try {
        const { imageUrl } = await req.json();

        if (!params.userId) {
            return new NextResponse("Authentication Error!", { status: 401 });
        }

        const profile = await prisma.profile.findUnique({
            where: {
                userId: params.userId
            }
        })

        const newProfile = await prisma.profile.update({
            where: {
                id: profile?.id
            },
            data: {
                imageUrl: imageUrl
            }
        })

        return NextResponse.json(newProfile);
    }
    catch (err) {
        console.log("[PROFILE_IMAGE_UPDATE]", err);
        return new NextResponse("Internet Error!", { status: 500 })
    }
}