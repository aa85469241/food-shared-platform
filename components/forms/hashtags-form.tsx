'use client';

import { useState } from "react";
import { Folder, FolderLock, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { screenFadeIn } from "@/lib/animation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { HashTag } from "@prisma/client";

type HashTagsValue = {
    name: string
    isPublic: boolean
}

type HashTagsFormProps = {
    hashtags?: HashTag[]
    values: HashTagsValue[]
    onChange: (values: HashTagsValue) => void
    onRemove: (name: string) => void
    onSwitch: (values: HashTagsValue) => void
}

const HashTagsForm = ({
    hashtags,
    values,
    onChange,
    onRemove,
    onSwitch,
}: HashTagsFormProps) => {
    const [hashTag, setHashTag] = useState<string>("");
    const [onInput, setOnInput] = useState(false);

    const handleOnAdd = () => {
        if (hashTag === "") return;

        const formattedHashTags = hashTag.split(/[,]+/);

        for (let tag of formattedHashTags) {
            if (tag.startsWith("#")) {
                tag = tag.replaceAll("#", "")
            }

            onChange({ name: tag.trim(), isPublic: true });
        }

        setHashTag("");
    }

    const switchTagState = (name: string) => {
        const tag = values.find(value => value.name === name);

        if (tag) onSwitch({ name: tag.name, isPublic: !tag.isPublic })
    }

    return (
        <motion.div
            className="w-full"
            initial={screenFadeIn.initial}
            animate={screenFadeIn.animate}
            transition={screenFadeIn.transition}
        >
            <div className="flex flex-col w-full gap-y-2">
                <h1 className="font-semibold whitespace-nowrap">
                    4. Give your food some hashtags (Optional).
                </h1>
                {values &&
                    <div className="flex items-center gap-x-3 flex-wrap">
                        {values.map(value => (
                            <div
                                key={value.name}
                                className="relative h-10 bg-secondary/50 border shadow rounded-md my-2"
                            >
                                <div className="w-full h-full flex items-center rounded-md overflow-hidden">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className={cn("h-full flex items-center justify-center cursor-pointer rounded-none",
                                            value.isPublic
                                                ? "bg-success"
                                                : "bg-destructive"
                                        )}
                                        onClick={() => switchTagState(value.name)}
                                    >
                                        {value.isPublic
                                            ? <Folder size={18} />
                                            : <FolderLock size={18} />
                                        }
                                    </Button>
                                    <p className="font-bold p-2 pl-1">
                                        {value.name}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 border border-primary rounded-full translate-x-1/2 -translate-y-1/2 bg-primary z-20 hover:scale-110 hover:transition"
                                    onClick={() => onRemove(value.name)}
                                >
                                    <XIcon size={15} className="text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                }
                <div>
                    <p className="text-sm font-semibold text-primary/70 ml-1 mb-1">
                        ( Add <span className="font-semibold">,</span> to separate different tags )
                    </p>
                    <div className="relative flex items-center gap-2">
                        <Input
                            value={hashTag}
                            placeholder="Enter one or more tags"
                            onChange={(e) => setHashTag(e.target.value)}
                            onFocus={() => setOnInput(true)}
                            onBlur={() => setTimeout(() => {
                                setOnInput(false)
                            }, 200)}
                        />
                        <Button onClick={handleOnAdd}>
                            Add
                        </Button>
                    </div>
                    <div
                        className={cn("w-full bg-white border rounded-md mt-1",
                            !onInput ? "hidden" : "block"
                        )}
                    >
                        <div className="flex flex-wrap gap-2 w-full h-full p-2">
                            {hashtags?.filter((value) => {
                                let tags = hashTag.split(",");
                                const tag = value.name.replace("#", "")

                                for (let i = 0; i < tags.length; i++) {
                                    if (value.name.includes(tags[i].trim()) && !tags[i].includes(tag)) {
                                        return true;
                                    }
                                }
                            }).map(tag => (
                                <Button
                                    key={tag.id}
                                    className="font-bold text-xs"
                                    onClick={() => setHashTag((current) => {
                                        let tags = current.split(",");
                                        const last = tags.pop() as string;

                                        if (tags.length > 0) {
                                            current = last.length === 0
                                                ? current.slice(0)
                                                : current.slice(0, -last.length)

                                            current = current.concat(" ", tag.name);
                                        } else {
                                            current = tag.name;
                                        }

                                        return current
                                    })}
                                >
                                    {tag.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default HashTagsForm;