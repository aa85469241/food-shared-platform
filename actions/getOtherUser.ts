import { TProfile } from "@/types";

export const getProfile = async (name: string): Promise<TProfile> => {

    const res = await fetch(`${process.env.NEXT_APP_PUBLIC_URL}/api/auth/other-user/${name}`);

    if (!res.ok) {
        throw new Error("Failed to fetch profile.")
    }

    return res.json();
}