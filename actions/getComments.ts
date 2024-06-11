import { Comment } from "@prisma/client";

export const getComments = async (): Promise<Comment[]> => {
    const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/comments`);

    if (!res.ok) {
        throw new Error("Failed to fetch comments.");
    }

    return res.json();
}