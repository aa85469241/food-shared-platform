'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Beef, ChevronsUpDownIcon, Clock, ArrowDownWideNarrow, ArrowUpWideNarrow, MapPin } from "lucide-react";
import { TFavorite } from "@/types";
import FavoriteItem from "./favorite-item";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const orderBy = [
    { condition: "Country", icon: MapPin },
    { condition: "Created_at", icon: Clock },
]

type FavoriteListProps = {
    favorites: TFavorite[]
}

const FavoriteList = ({ favorites }: FavoriteListProps) => {
    const [mounted, setMounted] = useState(false);
    const [sortCondition, setSortCondition] = useState("Created_at");
    const [direction, setDirection] = useState("desc");

    useEffect(() => {
        setMounted(true);
    }, []);

    const sortFavorites = () => {
        let sortedFavorites = favorites;

        if (sortCondition === "Country") {
            sortedFavorites = favorites.sort((x, y) => {
                let a = x.map.country;
                let b = y.map.country;

                if (direction === "desc") {
                    return b.localeCompare(a);
                } else {
                    return a.localeCompare(b);
                }
            })
        }

        if (sortCondition === "Created_at") {
            sortedFavorites.sort((x, y) => {
                let a = new Date(x.createdAt).toUTCString();
                let b = new Date(y.createdAt).toUTCString();

                if (direction === "desc") {
                    return a.localeCompare(b)
                } else {
                    return b.localeCompare(a)
                }
            })
        }

        return sortedFavorites
    }

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex flex-col space-y-4 mt-4">
            <div className="flex items-center space-x-2">
                <Select
                    value={sortCondition}
                    onValueChange={setSortCondition}
                >
                    <SelectTrigger className="max-w-48 text-sm font-medium">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {orderBy.map((value, index) => (
                            <SelectItem
                                key={index}
                                value={value.condition}
                                className="text-sm font-semibold"
                            >
                                <div className="flex items-center gap-x-1">
                                    <value.icon size={15} />{value.condition}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    value={direction}
                    onValueChange={setDirection}
                >
                    <SelectTrigger className="max-w-fit text-sm font-medium">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            value="asc"
                            className="text-sm font-semibold"
                        >
                            <div className="flex items-center gap-x-1">
                                <ArrowUpWideNarrow size={15} />Asc
                            </div>
                        </SelectItem>
                        <SelectItem
                            value="desc"
                            className="flex items-center text-sm font-semibold"
                        >
                            <div className="flex items-center gap-x-1">
                                <ArrowDownWideNarrow size={15} />Desc
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 mt-4">
                {sortFavorites().map(favorite => (
                    <Collapsible key={favorite.id} className="space-y-2">
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-between p-2"
                            >
                                <div className="w-full flex items-center gap-2">
                                    <Beef size={20} />
                                    <Link
                                        href={`/maps/${favorite.map.id}`}
                                        className="font-bold text-lg hover:underline hover:underline-offset-2"
                                    >
                                        {favorite.map.title}
                                    </Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="font-semibold flex items-center gap-1">
                                        <Clock size={15} />
                                        {format(favorite.createdAt, "yyyy-MM-dd")}
                                    </div>
                                    <ChevronsUpDownIcon size={20} />
                                    <span className="sr-only">Toggle</span>
                                </div>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-2 pr-1">
                            <FavoriteItem
                                key={favorite.id}
                                country={favorite.map.country}
                                address={favorite.map.address}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
    );
}

export default FavoriteList;