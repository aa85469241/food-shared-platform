'use client';

import { useEffect, useState } from "react";
import { FoodMap } from "@/types";
import ListItem from "./list-item";
import EditFormModal from "@/components/modals/EditFormModal";
import EmptyList from "./list-empty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, BadgePlus, Captions, ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
import { HashTag } from "@prisma/client";

const orderBy = [
    { condition: "Title", icon: Captions },
    { condition: "Created_at", icon: BadgePlus },
    { condition: "Updated_at", icon: Clock },
]

type FoodListProps = {
    maps: FoodMap[]
    hashtags: HashTag[] | undefined
}

const FoodList = ({
    maps,
    hashtags
}: FoodListProps) => {
    const [mounted, setMounted] = useState(false);
    const [initialValues, setInitialValues] = useState<FoodMap | undefined>();
    const [sortCondition, setSortCondition] = useState("Title");
    const [direction, setDirection] = useState("desc");

    useEffect(() => {
        setMounted(true);
    }, []);

    const sortFoodList = () => {
        let sortedFoodList = maps;

        if (sortCondition === "Title") {
            sortedFoodList = maps.sort((x, y) => {
                let a = x.title.toLowerCase();
                let b = y.title.toLowerCase();

                if (direction === "desc") {
                    return b.localeCompare(a);
                } else {
                    return a.localeCompare(b);
                }
            })
        }

        if (sortCondition === "Created_at") {
            sortedFoodList = maps.sort((x, y) => {
                let a = new Date(x.createdAt).toUTCString();
                let b = new Date(y.createdAt).toUTCString();

                if (direction === "desc") {
                    return b.localeCompare(a);
                } else {
                    return a.localeCompare(b);
                }
            })
        }

        if (sortCondition === "Updated_at") {
            sortedFoodList = maps.sort((x, y) => {
                let a = new Date(x.updatedAt).toUTCString();
                let b = new Date(y.updatedAt).toUTCString();

                console.log(a, b)

                if (direction === "desc") {
                    return b.localeCompare(a);
                } else {
                    return a.localeCompare(b);
                }
            })
        }

        return sortedFoodList
    }

    if (!mounted) {
        return null;
    }

    return (
        <>
            <div className="flex flex-col space-y-4">
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
                <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {sortFoodList().map(map => (
                        <ListItem
                            key={map.id}
                            data={map}
                            setInitialValues={setInitialValues}
                        />
                    ))}
                </div>
                {maps.length === 0 && <EmptyList />}
            </div>
            <EditFormModal
                initialValues={initialValues}
                hashtags={hashtags}
            />
        </>
    );
}

export default FoodList;