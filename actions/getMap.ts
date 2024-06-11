import { FoodMap } from "@/types";

export const getMap = async (id: string): Promise<FoodMap> => {
    const res = await fetch(`http://localhost:3000/api/maps/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch map");
    }

    return res.json();
}