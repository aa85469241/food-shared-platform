'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { UserFavorite } from "@/types";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type FavoritesCardProps = {
    favorites: UserFavorite[]
}

const FavoritesCard = ({
    favorites
}: FavoritesCardProps) => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <Card className="max-h-96 h-fit">
            <CardHeader className="pt-3">
                <CardTitle className="text-2xl font-bold">Favorites</CardTitle>
                <CardDescription>The history of you add to your favorite list.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 overflow-y-scroll">
                {favorites.map((favor, index) => (
                    <Button key={favor.id} className="w-fit h-max flex items-center gap-x-2 border rounded-sm shadow pl-1 pr-3 py-1">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src={favor.map.images[0].imgUrl}
                                alt={"food_map__" + index}
                                width={50}
                                height={50}
                            />
                            <AvatarFallback>
                                <Skeleton />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-center">
                            <div className="font-bold text-xs">{favor.map.title}</div>
                            <div className="text-xs">{format(favor.createdAt, "MM/dd")}</div>
                        </div>
                    </Button>
                ))}
                {favorites.length === 0
                    && <p className="w-full font-semibold text-center text-sm mt-4 md:text-base">
                        Your favorite list is empty.
                    </p>
                }
            </CardContent>
            <CardFooter className="justify-end pb-2">
                <div
                    className="flex items-end gap-x-2 text-sm font-semibold cursor-pointer hover:underline hover:underline-offset-1"
                    onClick={() => router.push(`${user?.id}/favorites`)}
                >
                    see details <ChevronRight size={15} />
                </div>
            </CardFooter>
        </Card>
    );
}

export default FavoritesCard;