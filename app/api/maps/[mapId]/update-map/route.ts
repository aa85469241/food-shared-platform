import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: { mapId: string } }
) {
    const { isPublic } = await req.json();

    const map = await prisma.map.update({
        where: {
            id: params.mapId
        },
        data: {
            isPublic
        }
    })

    return NextResponse.json(map);
}