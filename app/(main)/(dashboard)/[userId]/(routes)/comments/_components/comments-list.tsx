'use client';

import { CommentValue } from "@/types";
import CommentAccordion from "./comment-accordion";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownWideNarrow, ArrowUpWideNarrow, Captions, Clock, Star } from "lucide-react";

const orderBy = [
    { condition: "Updated_at", icon: Clock },
    { condition: "Title", icon: Captions },
    { condition: "Rating", icon: Star },
]

type CommentsListProps = {
    comments: CommentValue[]
}

const CommentsList = ({
    comments
}: CommentsListProps) => {
    const [mounted, setMounted] = useState(false);
    const [sortCondition, setSortCondition] = useState("Updated_at");
    const [direction, setDirection] = useState("desc");

    useEffect(() => {
        setMounted(true);
    }, [])

    const sortComments = () => {
        let sortedComments = comments;

        if (sortCondition === "Rating") {
            sortedComments = comments.sort((a, b) => {
                if (direction === "asc") {
                    return a.rating - b.rating;
                } else {
                    return b.rating - a.rating;
                }
            })
        }

        if (sortCondition === "Title") {
            sortedComments = comments.sort((x, y) => {
                let a = x.map?.title as string;
                let b = y.map?.title as string;

                if (direction === "asc") {
                    return a.localeCompare(b)
                } else {
                    return b.localeCompare(a)
                }
            })
        }

        if (sortCondition === "Updated_at") {
            sortedComments.sort((x, y) => {
                let a = new Date(x.updatedAt).toUTCString();
                let b = new Date(y.updatedAt).toUTCString();

                if (direction === "asc") {
                    return b.localeCompare(a)
                } else {
                    return a.localeCompare(b)
                }
            })
        }

        return sortedComments;
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
            <div className="w-full h-full grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
                {sortComments().map((comment, index) => (
                    <div
                        key={comment.id}
                        className="w-full flex items-center gap-x-2"
                    >
                        <CommentAccordion
                            index={index + 1}
                            comment={comment}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentsList;