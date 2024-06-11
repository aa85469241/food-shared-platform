import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
) {
    try {
        const hashtags = await prisma.hashTag.findMany({
            where: {
                isPublic: true,
            },
            orderBy: {
                name: "asc"
            }
        })

        return NextResponse.json(hashtags);
    }
    catch (err) {
        console.log("[HASHTAGS_GET]", err);
        return new NextResponse("Internet Error", { status: 500 });
    }
}