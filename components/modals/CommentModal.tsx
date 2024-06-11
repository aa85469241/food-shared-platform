'use client';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CommentSchema } from "@/lib/schema";
import { Comment } from "@prisma/client";
import { Star } from "lucide-react";
import { useCommentModal, useRating } from "@/hooks/useCommentModal";
import Modal from "./Modal";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

type CommentFormValue = z.infer<typeof CommentSchema>

type CommentModalProps = {
    initialValues?: Comment
}

const CommentModal = ({ initialValues }: CommentModalProps) => {
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
            content: initialValues ? initialValues.content : ""
        }
    })

    const title = initialValues ? "Update Comment" : "Comment";
    const description = initialValues ? "Update your comment." : "Share your feeling of this food."

    const onClose = () => {
        if (!initialValues) {
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
            if (!initialValues) {
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
                    await axios.patch(`/api/comments/${initialValues.id}`, values);
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
            actionLabel={initialValues ? "Update" : "Submit"}
            onSubmit={handleSubmit(onSubmit)}
            form={formBody}
        />

    );
}

export default CommentModal;