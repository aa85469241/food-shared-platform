'use client';

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import useFavorite from "@/hooks/useFavorite";
import { TProfile } from "@/types";

type FavoriteProps = {
    mapId: string
    currentUser: TProfile
    position: "relative" | "absolute"
    className?: string
}

const Favorite = ({
    mapId,
    currentUser,
    position,
    className
}: FavoriteProps) => {
    const { isFavorite, toggleFavorite } = useFavorite({
        currentUser,
        mapId
    });

    return (
        <div
            className={cn("cursor-pointer", position, className)}
            onClick={toggleFavorite}
        >
            <div className="relative">
                <Heart
                    className={cn("text-background hover:fill-white/50",
                        isFavorite
                            ? "fill-destructive animate-like"
                            : "fill-none"
                    )} />
                <span className={cn("absolute top-0 w-full h-full border-4 border-red-600 rounded-full origin-center scale-0",
                    isFavorite && "animate-ring-expand"
                )}></span>
            </div>
        </div>
    );
}

export default Favorite;