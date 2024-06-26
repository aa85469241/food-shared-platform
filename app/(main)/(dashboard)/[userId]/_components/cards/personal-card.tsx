'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TProfile } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import { clipPathVariants, innerClipPathVariants, textMoveUp } from "@/lib/animation";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useSettingModal } from "@/hooks/useSettingModal";
import SettingModal from "@/components/modals/SettingModal";

type PersonalCardProps = {
    data: TProfile
}

const PersonalCard = ({
    data
}: PersonalCardProps) => {
    const settingModal = useSettingModal();
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <>
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.imageUrl}
                        alt={data.imageUrl}
                        width={500}
                        height={500}
                        priority
                        className="h-full object-cover mix-blend-multiply"
                    />
                </div>
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-full flex items-center justify-center bg-secondary"
                    initial={false}
                    animate={open ? "open" : "closed"}
                    variants={clipPathVariants}
                >
                    <motion.div
                        className="w-full h-full bg-white cursor-pointer"
                        variants={innerClipPathVariants}
                        onClick={() => setOpen(isOpen => !isOpen)}
                    >
                        {
                            open
                                ? <motion.div
                                    className="w-full h-full flex flex-col items-end justify-end p-2"
                                    initial="closed"
                                    animate="open"
                                >
                                    <div className="overflow-hidden w-3/4 text-end">
                                        <motion.span
                                            className="inline-flex font-bold text-end text-sm md:text-base"
                                            custom={1}
                                            variants={textMoveUp}
                                        >
                                            {
                                                (data.firstName || data.lastName)
                                                    ? `${data.firstName} ${data.lastName}`
                                                    : `${data.name}`
                                            }
                                        </motion.span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <motion.span
                                            className="inline-flex font-bold text-xs"
                                            custom={2}
                                            variants={textMoveUp}
                                        >
                                            {data.birth
                                                ? "birth - " + format(new Date(data.birth), "yyyy.MM.dd")
                                                : "No birth data"}
                                        </motion.span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <motion.span
                                            className="inline-flex font-bold text-xs"
                                            custom={2}
                                            variants={textMoveUp}
                                        >
                                            Joined - {format(data.createdAt, "yyyy.MM.dd")}
                                        </motion.span>
                                    </div>
                                    <div className="overflow-hidden mt-4">
                                        <motion.span
                                            className="inline-flex font-bold"
                                            custom={3}
                                            variants={textMoveUp}
                                        >
                                            <Button
                                                size="icon"
                                                className="rounded-full hover:animate-spin"
                                                onClick={settingModal.open}
                                            >
                                                <Settings />
                                            </Button>
                                        </motion.span>
                                    </div>
                                </motion.div>
                                : <div className="relative w-full h-full flex flex-col items-end justify-end pr-2 pb-1 font-bold">
                                    open
                                </div>
                        }
                    </motion.div>
                </motion.div>
            </Card>
            <SettingModal data={data} />
        </>
    );
}

export default PersonalCard;