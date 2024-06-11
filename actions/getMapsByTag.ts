import { FoodMap } from "@/types";

export const getMapsByTag = async (name: string): Promise<FoodMap[]> => {
    const res = await fetch(`http://localhost:3000/api/hashtags/${name}`)

    if (!res.ok) throw new Error("Failed to fetch data.");

    return res.json();
}