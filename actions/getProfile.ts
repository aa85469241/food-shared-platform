import { TProfile } from "@/types";
import { auth } from "@clerk/nextjs/server";

export const getProfile = async (): Promise<TProfile> => {
    const { userId } = auth();

    const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/auth/${userId}`);

    if (!res.ok) {
        throw new Error("Failed to fetch profile.")
    }

    return res.json();
}