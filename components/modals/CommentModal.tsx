'use client';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CommentSchema } from "@/lib/schema";
import { Star } from "lucide-react";
import { useCommentModal, useRating } from "@/hooks/useCommentModal";
import Modal from "./Modal";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { UserComment } from "@/types";

type CommentFormValue = z.infer<typeof CommentSchema>

type CommentModalProps = {
    initialComments?: UserComment
}

const CommentModal = ({ initialComments }: CommentModalProps) => {
    const router = useRouter();
    const params = useParams();
    const commentModal = useCommentModal();
    const rating = useRating();
    const [isPending, startTransition] = useTransition();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {
            errors
        }
    } = useForm<CommentFormValue>({
        resolver: zodResolver(CommentSchema),
        mode: "onChange",
        defaultValues: {
            content: initialComments ? initialComments.content : ""
        }
    })

    const title = initialComments ? "Update Comment" : "Comment";
    const description = initialComments ? "Update your comment." : "Share your feeling of this food."

    const onClose = () => {
        if (!initialComments) {
            reset({ content: "" });
        }
        rating.setRating(0);
        commentModal.close();
    }

    useEffect(() => {
        if (rating.rate && rating.rate > 0) {
            setValue("rating", rating.rate);
        }
    })

    const onSubmit = async (values: CommentFormValue) => {
        try {
            if (!initialComments) {
                startTransition(async () => {
                    await axios.post(`/api/comments`, {
                        ...values,
                        mapId: params.mapId,
                    });
                    toast({
                        title: "Successfully comment."
                    })
                    router.refresh();
                })
            } else {
                startTransition(async () => {
                    await axios.patch(`/api/comments/${initialComments.id}`, values);
                    toast({
                        title: "Successfully update your comment."
                    })
                    router.refresh();
                })
            }
        }
        catch (err) {
            toast({
                title: "Error occur.",
                description: `${err}`
            })
        }
        finally {
            commentModal.close();
        }
    }

    const formBody = (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <Label className="font-semibold">Rating:</Label>
                <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, index) => {
                        let currentRating = index + 1;

                        return (
                            <div key={index} className="relative">
                                <Input
                                    type="radio"
                                    value={rating.rate}
                                    className="hidden"
                                    {...register("rating")}
                                />
                                <span>
                                    <Star className={cn("fill-primary stroke-1",
                                        currentRating <= rating.rate
                                        && "fill-yellow-500"
                                    )} />
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="space-y-1">
                <Label className="font-semibold">Comment:</Label>
                <Textarea
                    className="min-h-28"
                    {...register("content")}
                />
                {errors
                    && <div className="text-destructive text-sm font-semibold">
                        {errors.content?.message}
                    </div>
                }
            </div>
        </div>
    )

    return (
        <Modal
            modalId="comment-form"
            title={title}
            description={description}
            isOpen={commentModal.isOpen}
            close={onClose}
            disabled={isPending}
            actionLabel={initialComments ? "Update" : "Submit"}
            onSubmit={handleSubmit(onSubmit)}
            form={formBody}
        />

    );
}

export default CommentModal;