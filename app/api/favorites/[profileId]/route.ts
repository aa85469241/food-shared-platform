import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { profileId: string } }
) {
    try {
        if (!params.profileId) {
            return new NextResponse("Failed authenticated.", { status: 403 });
        }

        const favorites = await prisma.favorite.findMany({
            where: {
                profileId: params.profileId
            },
            include: {
                map: {
                    select: {
                        id: true,
                        title: true,
                        country: true,
                        address: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(favorites);
    }
    catch (err) {
        console.log("[FAVORITES_GET]", err);
        return new NextResponse("Internet Error!", { status: 500 })
    }
}