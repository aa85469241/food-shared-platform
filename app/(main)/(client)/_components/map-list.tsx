"use client";

import { FoodMap, TProfile } from "@/types";
import { useState, useEffect } from "react";
import MapCard from "./map-card";

type MapListProps = {
    currentUser: TProfile
    maps: FoodMap[]
}

const MapList = ({ currentUser, maps }: MapListProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <div className="mt-4 w-full grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {maps.map((map) => (
                <MapCard
                    key={map.id}
                    data={map}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}

export default MapList;