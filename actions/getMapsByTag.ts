import { FoodMap } from "@/types";

export const getMapsByTag = async (name: string): Promise<FoodMap[]> => {
    const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/hashtags/${name}`)

    if (!res.ok) throw new Error("Failed to fetch data.");

    return res.json();
}