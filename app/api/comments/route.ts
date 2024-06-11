import { NextResponse } from "next/server";
import { getProfile } from "@/actions/getProfile";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const profile = await getProfile();

        if (!profile) {
            return new NextResponse("UnAuthorized.", { status: 401 });
        }

        const body = await req.json();
        const { rating, content, mapId } = body;

        if (!rating || !content || !mapId) {
            return new NextResponse("Rating and comment are required.", { status: 403 })
        };

        const comment = await prisma.comment.create({
            data: {
                profileId: profile.id,
                rating,
                content,
                mapId: mapId
            }
        })

        return NextResponse.json(comment);
    }
    catch (err) {
        console.log("[COMMENTS_POST]", err);
        return new NextResponse("Internet Error.", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                profile: {
                    select: {
                        name: true,
                        imageUrl: true,
                        firstName: true,
                        lastName: true,
                    }
                },
                map: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            },
            orderBy: {
                updatedAt: "desc"
            }
        })

        return NextResponse.json(comments);
    }
    catch (err) {
        console.log("[COMMENTS_GET]", err);
        return new NextResponse("Internet Error.", { status: 500 });
    }
}