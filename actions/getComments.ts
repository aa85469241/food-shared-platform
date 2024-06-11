import { Comment } from "@prisma/client";

export const getComments = async (): Promise<Comment[]> => {
    const res = await fetch("http://localhost:3000/api/comments");

    if (!res.ok) {
        throw new Error("Failed to fetch comments.");
    }

    return res.json();
}