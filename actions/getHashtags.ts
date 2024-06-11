import { HashTag } from "@prisma/client";

export const getHashtags = async (): Promise<HashTag[]> => {
    const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/hashtags`);

    if (!res.ok) throw new Error("Failed to fetch hashtags.");

    return res.json();
}