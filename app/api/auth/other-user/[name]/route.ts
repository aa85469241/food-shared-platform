import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { name: string } }
) {
    try {
        if (!params.name) {
            return new NextResponse("Missing params name.", { status: 401 });
        }

        const profile = await prisma.profile.findMany({
            where: {
                name: params.name
            }
        })

        return NextResponse.json(profile);
    }
    catch (err) {
        console.log(`[${params.name}_GET]`, err);
        return new NextResponse("Internet Error", { status: 500 });
    }
}