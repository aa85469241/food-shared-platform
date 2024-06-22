import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        if (!params.userId) {
            return new NextResponse("Authentication failed!", { status: 401 })
        }

        const profile = await prisma.profile.findUnique({
            where: {
                userId: params.userId,
            },
            include: {
                maps: {
                    select: {
                        id: true,
                        title: true,
                        isPublic: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    orderBy: {
                        updatedAt: "desc"
                    }
                },
                favorites: {
                    include: {
                        map: {
                            select: {
                                id: true,
                                title: true,
                                images: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                comments: {
                    include: {
                        map: true
                    },
                    orderBy: {
                        updatedAt: "desc"
                    }
                }
            }
        })

        return NextResponse.json(profile);
    }
    catch (err) {
        console.log("[PROFILE_GET]", err);
        return new NextResponse("Internet Error!", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const body = await req.json();
        const { firstName, lastName, birth, description } = body;

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
                firstName,
                lastName,
                birth,
                description,
            }
        })

        return NextResponse.json(newProfile);
    }
    catch (err) {
        console.log("[PROFILE_PATCH]", err);
        return new NextResponse("Internet Error!", { status: 500 })
    }
}