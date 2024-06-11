import { TFavorite } from "@/types";
import { getProfile } from "./getProfile";
import { redirect } from "next/navigation";

export const getFavorites = async (): Promise<TFavorite[]> => {
    const profile = await getProfile();

    if (!profile) {
        redirect("/auth/sign-in");
    }
    
    const res = await fetch(`http://localhost:3000/api/favorites/${profile.id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch favorites.");
    }

    return res.json();
}