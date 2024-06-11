'use client';

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useCommentModal, useRating } from "@/hooks/useCommentModal";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommentValue, TProfile } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type RateAndCommentProps = {
    comments: CommentValue[]
    currentUser: TProfile
    profileId: string
}

const RateAndComment = ({
    comments,
    currentUser,
    profileId
}: RateAndCommentProps) => {
    const auth = useAuth();
    const router = useRouter();
    const commentModal = useCommentModal();
    const rating = useRating();
    const [hover, setHover] = useState<number>(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    const averageRating = comments.reduce((acc, item) => {
        return Math.round((acc + item.rating) / comments.length)
    }, 0)

    if (!mounted) {
        return null;
    }

    return (
        <div className="w-full flex items-center gap-2">
            {[...Array(5)].map((_, index) => {
                const currentRating = index + 1

                return (
                    <div key={index} className="relative">
                        <Input
                            type="radio"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => {
                                if (!auth.isSignedIn) {
                                    router.push("/auth/sign-in")

                                    return;
                                }

                                if (auth.isSignedIn && profileId === currentUser.id) {
                                    toast({
                                        title: "You cannot comment your food map."
                                    })

                                    return;
                                }

                                rating.setRating(currentRating)
                                setTimeout(() => {
                                    commentModal.open()
                                }, 500)
                            }}
                        />
                        <Star
                            className={cn("stroke-1 fill-primary/90",
                                currentRating <= averageRating
                                && "fill-yellow-500",
                                currentRating <= rating.rate
                                && "fill-yellow-500 animate-like",
                                currentRating <= hover
                                && "fill-destructive"
                            )}
                        />
                    </div>
                )
            })}
            <div className="font-semibold">
                {`(${comments.length})`}
            </div>
        </div>
    );
}

export default RateAndComment;