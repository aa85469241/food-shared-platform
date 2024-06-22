import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { mapId: string } }
) {
    try {
        if (!params.mapId) {
            return new NextResponse("Invalid value.", { status: 400 });
        }

        const map = await prisma.map.findUnique({
            where: {
                id: params.mapId
            },
            include: {
                images: true,
                hashTags: true,
                profile: true,
            }
        })

        return NextResponse.json(map);
    }
    catch (err) {
        console.log("[MAP_GET]", err);
        return new NextResponse("Internet error!", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { mapId: string } }
) {
    try {
        const body = await req.json();
        const {
            country,
            address,
            title,
            description,
            lowestPrice,
            highestPrice,
            images,
            hashTags,
        } = body;

        if (!country || !title || !description || !lowestPrice || !highestPrice || !images) {
            return new NextResponse("Missing some values!", { status: 400 });
        }

        if (!params.mapId) {
            return new NextResponse("Invalid value.", { status: 400 });
        }

        await prisma.map.update({
            where: {
                id: params.mapId
            },
            data: {
                images: {
                    deleteMany: {}
                },
                hashTags: {
                    deleteMany: {}
                }
            }
        })

        const map = await prisma.map.update({
            where: {
                id: params.mapId
            },
            data: {
                country,
                address,
                title,
                description,
                lowestPrice,
                highestPrice,
                images: {
                    createMany: {
                        data: [
                            ...images.map((item: { imgUrl: string }) => item)
                        ]
                    }
                },
                hashTags: hashTags.length > 0 ? {
                    createMany: {
                        data: [
                            ...hashTags.map((item: { name: string, isPublic: boolean }) => item)
                        ]
                    }
                } : {},
            },
        })

        return NextResponse.json(map);
    }
    catch (err) {
        console.log("[MAP_PATCH]", err);
        return new NextResponse("Internet error!", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { mapId: string } }
) {
    try {
        if (!params.mapId) {
            return new NextResponse("Invalid value.", { status: 400 });
        }

        const map = await prisma.map.delete({
            where: {
                id: params.mapId
            },
        })

        return NextResponse.json(map);
    }
    catch (err) {
        console.log("[MAP_DELETE]", err);
        return new NextResponse("Internet error!", { status: 500 })
    }
}