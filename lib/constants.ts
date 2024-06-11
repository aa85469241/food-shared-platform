import { MessageSquareMore, UtensilsCrossed, Star } from "lucide-react";

export const routes = [
    {
        label: "My Food List",
        icon: UtensilsCrossed,
        href: "foods"
    },
    {
        label: "My Comments",
        icon: MessageSquareMore,
        href: "comments",
    },
    {
        label: "My Favorites",
        icon: Star,
        href: "favorites"
    }
]

export const query = [
    "country",
    "minPrice",
    "maxPrice",
    "favorite",
]