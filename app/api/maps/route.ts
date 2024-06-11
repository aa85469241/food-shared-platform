import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
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

        const profile = await prisma.profile.findUnique({
            where: {
                userId: user?.id
            }
        })

        if (!profile) {
            return new NextResponse("Authentication Error!", { status: 403 });
        }

        const maps = await prisma.map.create({
            data: {
                profileId: profile.id,
                country,
                address,
                title,
                description,
                lowestPrice,
                highestPrice,
                isPublic: true,
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

        return NextResponse.json(maps);
    }
    catch (err) {
        console.log("[MAP_POST]", err);
        return new NextResponse("Internet Error", { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const country = searchParams.get('country') || undefined;
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const isPublic = searchParams.get('isPublic');
        const favorite = searchParams.get('favorite');

        const maps = await prisma.map.findMany({
            where: {
                country,
                AND: [
                    {
                        lowestPrice: {
                            gte: minPrice ? Number(minPrice) : undefined
                        },
                        highestPrice: {
                            lte: maxPrice ? Number(maxPrice) : undefined
                        }
                    },
                ],
                isPublic: isPublic ? true : undefined,
                favorites: favorite ? {
                    some: {
                        profileId: favorite
                    }
                } : undefined
            },
            include: {
                images: true,
                hashTags: true,
                favorites: true
            },
            orderBy: {
                country: "desc"
            }
        })

        return NextResponse.json(maps);
    }
    catch (err) {
        console.log("[MAPS_GET]", err);
        return new NextResponse("Internet Error", { status: 500 })
    }
}