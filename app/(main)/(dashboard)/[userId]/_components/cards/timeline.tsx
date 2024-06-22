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
import { cn } from "@/lib/utils";
import { UserMap } from "@/types";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type FoodListCardProps = {
    maps: UserMap[]
}

const TimeLine = ({
    maps
}: FoodListCardProps) => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <Card className="w-full h-full max-h-96 flex flex-col md:max-h-none">
            <CardHeader className="pt-3">
                <CardTitle className="text-2xl font-bold">TimeLine</CardTitle>
                <CardDescription className="font-medium">
                    The history of you organized your food list.
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className="relative overflow-y-scroll">
                <div
                    id="timeline"
                    className="relative space-y-6 ml-4"
                >
                    {maps.map(map => (
                        <div
                            key={map.id}
                            className="relative flex items-center text-sm"
                        >
                            <div className="absolute w-5 -left-2.5 aspect-square rounded-full bg-white border-2 border-primary/80 p-[1px] z-10">
                                <div className="w-full h-full rounded-full bg-primary/80"></div>
                            </div>
                            <div className="text-sm font-medium ml-6">
                                You <span className={cn("font-bold",
                                    map.createdAt === map.updatedAt
                                        ? "text-primary"
                                        : "text-success"
                                )}>
                                    {map.createdAt === map.updatedAt
                                        ? "built" : "updated"
                                    }
                                </span>
                                <span className="font-semibold mx-1">
                                    {`"${map.title}"`}
                                </span> on {map.createdAt === map.updatedAt
                                    ? format(map.createdAt, "PPP")
                                    : format(map.updatedAt, "PPP")
                                }.
                            </div>
                        </div>
                    ))}
                </div>
                {maps.length === 0
                    && <p className="w-full font-semibold text-center text-sm mt-4 md:text-base">
                        You did not do any action recently.
                    </p>}
            </CardContent>
            <CardFooter className="justify-end mb-0 mt-auto pb-2">
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

export default TimeLine;