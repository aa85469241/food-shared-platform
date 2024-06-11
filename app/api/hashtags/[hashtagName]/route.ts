import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { hashtagName: string } }
) {
    try {
        if (!params.hashtagName) {
            return new NextResponse("hashTagId is required.", { status: 403 });
        }

        const maps = await prisma.map.findMany({
            where: {
                hashTags: {
                    some: {
                        name: params.hashtagName
                    }
                }
            },
            include: {
                images: true,
            }
        })

        return NextResponse.json(maps);
    }
    catch (err) {
        console.log("[MAPS_GET__WITH_HASHTAG]", err);
        return new NextResponse("Internet Error", { status: 500 });
    }
}