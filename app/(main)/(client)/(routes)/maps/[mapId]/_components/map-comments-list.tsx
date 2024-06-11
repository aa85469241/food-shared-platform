'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentValue, TProfile } from "@/types";
import RatingStar from "./rating-star";
import { format } from "date-fns";

type MapCommentsListProps = {
    comments: CommentValue[]
    currentUser: TProfile
}

const MapCommentsList = ({
    comments,
    currentUser
}: MapCommentsListProps) => {
    return (
        <div className="flex flex-wrap gap-4">
            {comments.map(comment => {
                if (!comment.profile) {
                    return null;
                }

                return (
                    <div
                        key={comment.id}
                        className="w-fit max-w-md flex flex-col gap-y-2 border rounded-md shadow bg-white p-3"
                    >
                        <div className="flex items-center gap-x-2">
                            <Avatar className="h-7 w-7">
                                <AvatarImage src={comment.profile.imageUrl} />
                                <AvatarFallback>
                                    <Skeleton />
                                </AvatarFallback>
                            </Avatar>
                            <p className="font-bold">
                                {comment.profile.name}
                                <span className="ml-1">
                                    {comment.profileId === currentUser.id
                                        && "(You)"}
                                </span>
                            </p>
                            <div className="ml-3 text-xs font-bold">
                                {format(comment.updatedAt, "MM/dd")}
                            </div>
                        </div>
                        <div className="pl-9">
                            <RatingStar rate={comment.rating} />
                        </div>
                        <p className="pl-9 font-semibold">
                            {comment.content}
                        </p>
                    </div>
                )
            })}
        </div>
    );
}

export default MapCommentsList;