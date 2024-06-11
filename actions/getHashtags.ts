import { HashTag } from "@prisma/client";

export const getHashtags = async (): Promise<HashTag[]> => {
    const res = await fetch("http://localhost:3000/api/hashtags");

    if (!res.ok) throw new Error("Failed to fetch hashtags.");

    return res.json();
}