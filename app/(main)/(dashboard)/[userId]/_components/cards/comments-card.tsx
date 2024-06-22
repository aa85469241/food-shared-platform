'use client';

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { UserComment } from "@/types";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type CommentsCardProps = {
    comments: UserComment[]
}

const CommentsCard = ({ comments }: CommentsCardProps) => {
    const router = useRouter();
    const { user } = useUser();
    const [weekly, setWeekly] = useState("7");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const getWeeklyComments = () => {
        const getLastSevenDate = () => {
            const date = new Date();
            date.setUTCDate(date.getUTCDate() - parseInt(weekly))

            return date
        }

        const weeklyComments = comments.filter(comment => new Date(comment.updatedAt) > getLastSevenDate())

        return weeklyComments;
    }

    if (!mounted) {
        return null;
    }

    return (
        <Card className="w-full h-fit max-h-96 flex flex-col">
            <CardHeader className="pt-3 pb-0">
                <CardTitle className="text-2xl font-bold">Comments</CardTitle>
                <CardDescription className="font-medium">
                    The history of your comments.
                </CardDescription>
                <Separator />
                <div className="flex justify-end">
                    <Select
                        value={weekly.toString()}
                        onValueChange={(value) => setWeekly(value)}
                    >
                        <SelectTrigger className="max-w-28 h-8 border-primary/80">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(4)].map((_, index) => {
                                const a_week = ((index + 1) * 7);

                                return (
                                    <SelectItem
                                        key={index}
                                        value={a_week.toString()}
                                    >
                                        <div className="font-semibold">
                                            In {a_week} days
                                        </div>
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="h-full space-y-2 overflow-y-scroll">
                {getWeeklyComments().map((comment) => {
                    const createdAt = new Date(comment.createdAt);
                    const updatedAt = new Date(comment.updatedAt);

                    if (updatedAt > createdAt) {
                        return (
                            <div
                                key={comment.id}
                                className="flex flex-col"
                            >
                                <div className="font-bold text-sm">
                                    {format(updatedAt, "MM/dd")}
                                </div>
                                <div className="font-medium text-sm px-1">
                                    You have <span className="text-success font-bold">
                                        updated
                                    </span> your comment of <span className="font-bold">
                                        {'"'}{comment.map.title}{'"'}
                                    </span>.
                                </div>
                            </div>
                        )
                    }

                    return (
                        <div
                            key={comment.id}
                            className="flex flex-col"
                        >
                            <div className="font-bold text-sm">
                                {format(updatedAt, "MM/dd")}
                            </div>
                            <div className="font-medium text-sm px-1">
                                You <span className="font-bold">
                                    made
                                </span> a comment to <span className="font-bold">
                                    {'"'}{comment.map.title}{'"'}
                                </span>.
                            </div>
                        </div>
                    )
                })}
                {getWeeklyComments().length === 0
                    && <p className="w-full font-semibold text-center text-sm mt-4 md:text-base">
                        You did not make any comment in past {weekly} days.
                    </p>}
            </CardContent>
            <CardFooter className="justify-end pb-2">
                <div
                    className="flex items-end gap-x-2 text-sm font-semibold cursor-pointer hover:underline hover:underline-offset-1"
                    onClick={() => router.push(`${user?.id}/comments`)}
                >
                    see details <ChevronRight size={15} />
                </div>
            </CardFooter>
        </Card>
    );
}

export default CommentsCard;