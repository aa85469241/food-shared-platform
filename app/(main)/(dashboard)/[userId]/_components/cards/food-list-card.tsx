'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserMap } from "@/types";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type FoodListCardProps = {
    maps: UserMap[]
}

const FoodListCard = ({
    maps
}: FoodListCardProps) => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <Card className="max-h-80 h-fit">
            <CardHeader className="pt-3">
                <CardTitle className="text-2xl">Food List</CardTitle>
                <CardDescription className="font-medium">
                    The history of the food map be published.
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className="relative space-y-2 overflow-y-scroll">
                {maps.map(map => {
                    if (map.createdAt === map.updatedAt) {
                        return (
                            <div key={map.id} className="flex items-center space-x-2 text-sm">
                                <div className="text-sm font-medium">
                                    - You <span className="font-bold">
                                        built
                                    </span>
                                    <span className="font-semibold mx-1">
                                        {`"${map.title}"`}
                                    </span> on {format(map.createdAt, "PPP")}.
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={map.id} className="flex items-center space-x-2 text-sm">
                                <div className="text-sm font-medium">
                                    - You <span className="text-success font-bold">
                                        updated
                                    </span>
                                    <span className="font-semibold mx-1">
                                        {`"${map.title}"`}
                                    </span> on {format(map.updatedAt, "PPP")}.
                                </div>
                            </div>
                        )
                    }
                })}
                <div className="absolute inset-x-0 bottom-0 bg-white h-5 blur-md"></div>
            </CardContent>
            <CardFooter className="justify-end pb-2">
                <div
                    className="flex items-end gap-x-2 text-sm font-semibold cursor-pointer hover:underline hover:underline-offset-1"
                    onClick={() => router.push(`${user?.id}/foods`)}
                >
                    see details <ChevronRight size={15} />
                </div>
            </CardFooter>
        </Card>
    );
}

export default FoodListCard;