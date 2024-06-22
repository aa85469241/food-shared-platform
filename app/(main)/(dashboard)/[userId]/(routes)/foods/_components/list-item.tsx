'use client';

import { useState, useTransition } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CircleEllipsis, Edit3, EyeIcon, EyeOffIcon, Trash } from "lucide-react";
import { FoodMap } from "@/types";
import { format } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEditModal } from "@/hooks/useEditModal";
import { cardFadeInOut } from "@/lib/animation";
import StatusToggler from "./status-toggler";

type ListItemProps = {
    data: FoodMap
    setInitialValues: React.Dispatch<FoodMap>
}

const ListItem = ({ data, setInitialValues }: ListItemProps) => {
    const editModal = useEditModal();
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [isPending, startTransition] = useTransition();

    const onDelete = () => {
        try {
            startTransition(async () => {
                await axios.delete(`/api/maps/${data.id}`)
                toast({
                    title: `${data.title} has been deleted`
                })
            })
            setShowAlert(false);
            router.refresh();
        }
        catch (err) {
            toast({
                title: "Error occurred!",
                description: `${err}`
            })
        }
    }

    return (
        <>
            <motion.div
                initial={cardFadeInOut.initial}
                animate={cardFadeInOut.animate}
                exit={cardFadeInOut.exit}
                transition={cardFadeInOut.transition}
                className="relative max-w-md w-full flex border-2 border-primary/65 rounded-md p-0.5 overflow-x-hidden"
            >
                <div className="relative h-24 aspect-square">
                    <Image
                        src={data.images[0]?.imgUrl}
                        alt={data.images[0]?.id}
                        fill
                        sizes="auto"
                        priority
                        className="object-cover rounded-md"
                    />
                </div>
                <div className="relative flex flex-col justify-between w-full px-4 py-1 overflow-x-hidden">
                    <div className="w-full flex items-center justify-between gap-x-2">
                        <div
                            className="font-bold text-xl whitespace-nowrap line-clamp-1 cursor-pointer hover:underline hover:underline-offset-1"
                            onClick={() => router.push(`/maps/${data.id}`)}
                        >
                            {data.title}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="hover:scale-110 active:scale-95">
                                    <CircleEllipsis className="rotate-90" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-8 bg-background">
                                <DropdownMenuLabel className="font-bold">
                                    Action
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="font-semibold p-2"
                                    onClick={() => {
                                        setInitialValues(data);
                                        editModal.open();
                                    }}
                                >
                                    Edit
                                    <DropdownMenuShortcut>
                                        <Edit3 size={18} />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="font-semibold p-2"
                                    onClick={() => setShowAlert(true)}
                                >
                                    Delete
                                    <DropdownMenuShortcut>
                                        <Trash size={18} />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <StatusToggler
                        mapId={data.id}
                        isPublic={data.isPublic}
                    />
                    <div>
                        <div className="flex items-center gap-1 font-semibold text-xs text-primary/70 whitespace-nowrap">
                            <div>Create At:</div>
                            <div>
                                {format(data.createdAt, "yyyy-MM-dd")}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-xs text-primary/70 whitespace-nowrap">
                            <div>Last update:</div>
                            <div>
                                {format(data.updatedAt, "yyyy-MM-dd")}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <AlertModal
                title="Are you sure?"
                description={`You will not be able to recover this map. Please make sure you really want to delete "${data.title}".`}
                open={showAlert}
                onOpenChange={setShowAlert}
                disabled={isPending}
                button={
                    <Button
                        variant="destructive"
                        disabled={isPending}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}

export default ListItem;