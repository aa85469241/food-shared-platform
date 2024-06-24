'use client';

import { priceFormat } from "@/lib/format";
import { cn } from "@/lib/utils";
import useFavorite from "@/hooks/useFavorite";
import { CommentValue, FoodMap, TProfile } from "@/types";
import { Heart, MapPin } from "lucide-react";
import TooltipButton from "@/components/TooltipButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import RateAndComment from "./rate-and-comment";
import MemberInfoCard from "./member-info-card";

type InfoSectionProps = {
    map: FoodMap
    comments: CommentValue[]
    currentUser: TProfile
}

const InfoSection = ({ map, comments, currentUser }: InfoSectionProps) => {
    const router = useRouter();
    const isPublisher = (map.profile.id === currentUser?.id)
    const { isFavorite, toggleFavorite } = useFavorite({
        currentUser,
        mapId: map.id
    });

    return (
        <div className="w-full space-y-3 pt-2 md:px-4 md:space-y-4">
            <div className="w-fill flex flex-col">
                <div className="flex justify-between space-x-2">
                    <h1 className="text-3xl font-bold">{map.title}</h1>
                    <TooltipButton content="toggle-favorite">
                        <Button
                            size="icon"
                            variant="ghost"
                            disabled={isPublisher}
                            className="rounded-full"
                            onClick={toggleFavorite}
                        >
                            <Heart className={cn("stroke-1 stroke-primary", isFavorite ? "fill-destructive text-destructive" : "fill-none")} />
                        </Button>
                    </TooltipButton>
                </div>
            </div>
            <MemberInfoCard profile={map.profile} />
            <div className="w-layout-hflex font-semibold">
                <MapPin size={20} />
                <div>{map.country}</div>
                <div>{map.address}</div>
            </div>
            <RateAndComment
                comments={comments}
                profileId={map.profileId}
                currentUser={currentUser}
            />
            <div className="w-full flex items-center flex-wrap gap-2">
                {map.hashTags.map((hashTag) => (
                    <Button
                        key={hashTag.id}
                        onClick={() => router.push(`/maps/tags/${hashTag.name}`)}
                    >
                        <p className="font-semibold">#{hashTag.name}</p>
                    </Button>
                ))}
            </div>
            <div className="w-layout-hflex justify-end gap-x-2 pr-2 pt-4">
                <div className="font-bold text-xl">{priceFormat.format(map.lowestPrice)}</div>
                <div className="font-bold text-lg">~</div>
                <div className="font-bold text-xl">{priceFormat.format(map.highestPrice)}</div>
            </div>
            <Separator />
            <div>
                <div className="font-bold text-lg tracking-wide">Description:</div>
                <div className="p-2 font-semibold whitespace-pre-line">
                    {map.description}
                </div>
            </div>
        </div>
    );
}

export default InfoSection;