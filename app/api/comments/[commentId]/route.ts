import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type TParams = {
    commentId: string
}

export async function PATCH(
    req: Request,
    { params }: { params: TParams }
) {
    try {
        const body = await req.json();
        const { rating, content } = body;

        if (!params.commentId) {
            return new NextResponse("Comment Id not provided.", { status: 403 });
        }

        const comment = await prisma.comment.update({
            where: {
                id: params.commentId
            },
            data: {
                rating,
                content
            }
        })

        return NextResponse.json(comment);
    }
    catch (err) {
        console.log("[COMMENT_PATCH]", err);
        return new NextResponse("Internet Error.", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: TParams }
) {
    try {
        if (!params.commentId) {
            return new NextResponse("Comment Id not provided.", { status: 403 });
        }

        const comment = await prisma.comment.delete({
            where: {
                id: params.commentId
            },
        })

        return NextResponse.json(comment);
    }
    catch (err) {
        console.log("[COMMENT_DELETE]", err);
        return new NextResponse("Internet Error.", { status: 500 });
    }
}