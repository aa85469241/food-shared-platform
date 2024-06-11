import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getProfile } from "@/actions/getProfile";

type TParams = {
    mapId: string
}

export async function POST(
    req: Request,
    { params }: { params: TParams }
) {
    try {
        const profile = await getProfile();

        if (!profile) {
            return new NextResponse("UnAuthorized.", { status: 403 });
        }

        const { mapId } = params;

        const favorite = await prisma.favorite.create({
            data: {
                profileId: profile.id,
                mapId: mapId,
            }
        })

        return NextResponse.json(favorite);
    }
    catch (err) {
        console.log(["FAVORITE_POST", err]);
        return new NextResponse("Internet Error!", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: TParams }
) {
    try {
        const profile = await getProfile();

        if (!profile) {
            return new NextResponse("UnAuthorized.", { status: 403 });
        }

        const { mapId } = params;

        const favorites = await prisma.favorite.deleteMany({
            where: {
                profileId: profile.id,
                mapId: mapId
            },
        })

        return NextResponse.json(favorites);
    }
    catch (err) {
        console.log(["FAVORITE_DELETE", err]);
        return new NextResponse("Internet Error!", { status: 500 });
    }
}