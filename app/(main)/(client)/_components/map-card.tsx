'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import { priceFormat } from "@/lib/format";
import { FoodMap, TProfile } from "@/types";
import { Card } from "@/components/ui/card";
import ImageGallery from "./image-gallery";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import TooltipButton from "@/components/TooltipButton";
import TipLabel from "./tip-label";
import Favorite from "./favorite";

type MapCardProps = {
    data: FoodMap
    currentUser: TProfile
}

const MapCard = ({
    data,
    currentUser
}: MapCardProps) => {
    const router = useRouter();
    const [collapse, setCollapse] = useState(false);

    return (
        <Card className="relative max-w-sm w-full h-fit mx-auto pb-2">
            <div className="w-full p-2">
                <ImageGallery images={data.images} />
            </div>
            <TipLabel label={data.country} className="top-4 -left-1" />
            <Favorite
                mapId={data.id}
                currentUser={currentUser}
                position="absolute"
                className="top-4 right-4"
            />
            <div className="relative w-full h-full flex flex-col gap-1">
                <div className="flex items-center justify-between px-2">
                    <div className="line-clamp-1 text-xl font-bold overflow-x-hidden md:text-2xl">
                        {data.title}
                    </div>
                    <TooltipButton content="See details">
                        <Button
                            variant="default"
                            size="icon"
                            className="rounded-full h-fit w-fit"
                            onClick={() => router.push(`/maps/${data.id}`)}
                        >
                            <AlertCircleIcon />
                        </Button>
                    </TooltipButton>
                </div>
                <div className="px-3">
                    <p className={cn("text-xs font-semibold tracking-wide text-primary/80 whitespace-pre-line md:text-sm",
                        collapse ? "line-clamp-none" : "line-clamp-1"
                    )}>
                        {data.description}
                    </p>
                    <div className="text-end">
                        <span
                            className="text-xs font-medium border px-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white"
                            onClick={() => setCollapse((prev) => !prev)}
                        >
                            expand+
                        </span>
                    </div>
                </div>
                <div className="w-full mt-3 space-x-1 overflow-hidden">
                    <div className="w-full flex justify-end text-xs font-semibold tracking-wide space-x-1 pr-2 xl:text-sm md:space-x-2 md:pr-4">
                        <span>{priceFormat.format(data.lowestPrice)}</span>
                        <span>~</span>
                        <span>{priceFormat.format(data.highestPrice)}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default MapCard;