import qs from "query-string"
import { FoodMap } from "@/types"

export type Query = {
    country?: string
    minPrice?: number
    maxPrice?: number
    isPublic?: boolean
    favorite?: string
}

export const getMaps = async (query?: Query): Promise<FoodMap[]> => {
    const url = qs.stringifyUrl({
        url: `${process.env.NEXT_APP_PUBLIC_URL}/api/maps`,
        query: {
            country: query?.country,
            minPrice: query?.minPrice,
            maxPrice: query?.maxPrice,
            isPublic: query?.isPublic,
            favorite: query?.favorite,
        }
    })

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch maps.");
    }

    return res.json();
}