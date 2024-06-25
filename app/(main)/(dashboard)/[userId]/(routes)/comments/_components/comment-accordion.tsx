'use client';

import Link from "next/link";
import { CommentValue } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format } from "date-fns";
import { Star, Trash2Icon } from "lucide-react";
import AlertModal from "@/components/modals/AlertModal";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

type CommentAccordionProps = {
    index: number
    comment: CommentValue
}

const CommentAccordion = ({
    index,
    comment
}: CommentAccordionProps) => {
    const router = useRouter();
    const [removeAlert, setRemoveAlert] = useState(false);
    const [isPending, startTransition] = useTransition();

    const onDelete = async (id: string) => {
        try {
            startTransition(async () => {
                await axios.delete(`/api/comments/${id}`)
                toast({
                    title: "Delete comment successfully."
                })
                setRemoveAlert(false);
                router.refresh();
            })
        }
        catch (err) {
            toast({
                title: "Delete comment failed."
            })
        }
    }

    return (
        <>
            <Accordion
                type="single"
                collapsible
                className="w-full"
            >
                <AccordionItem
                    value={comment.id}
                    className="w-full border-2 border-primary/90 rounded-sm"
                >
                    <AccordionTrigger className="h-10 pr-2">
                        <div className="w-full flex items-center justify-between px-2">
                            <Link
                                href={`/maps/${comment.map?.id}`}
                                className="text-lg font-semibold hover:underline hover:underline-offset-2"
                            >
                                {index}. {comment.map?.title}
                            </Link>
                            <div className="flex items-center">
                                <div
                                    className="group"
                                    onClick={() => setRemoveAlert(true)}
                                >
                                    <Trash2Icon
                                        size={18}
                                        className="mr-2 transition-colors text-slate-500 group-hover:text-primary"
                                    />
                                </div>
                                <div className="font-semibold mr-1">
                                    {comment.rating}
                                </div>
                                <Star size={15} />
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-y-4 p-2">
                        <p className="text-sm font-medium px-2">
                            {comment.content}
                        </p>
                        <div className="self-end mr-2">
                            <div className="flex items-center space-x-2">
                                <div className="font-semibold text-xs whitespace-nowrap">
                                    Published at: {format(comment.createdAt, "yyyy-MM-dd")}
                                </div>
                                <div className="font-medium">|</div>
                                <div className="font-semibold text-xs whitespace-nowrap">
                                    Last updated: {format(comment.updatedAt, "yyyy-MM-dd")}
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <AlertModal
                open={removeAlert}
                onOpenChange={setRemoveAlert}
                title="Do you really wanna remove this comment?"
                disabled={isPending}
                button={
                    <Button
                        variant="destructive"
                        onClick={() => onDelete(comment.id)}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}

export default CommentAccordion;