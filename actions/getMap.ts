import { FoodMap } from "@/types";

export const getMap = async (id: string): Promise<FoodMap> => {
    const res = await fetch(`${process.env.NEXT_APP_PUBLIC_URL}/api/maps/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch map");
    }

    return res.json();
}