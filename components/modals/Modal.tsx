'use client';

import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

import { Separator } from "../ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../ui/card";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";

type FormModalProps = {
    modalId: string
    isOpen: boolean
    close: () => void
    title: string
    description: string
    disabled: boolean
    actionLabel: string
    onSubmit: () => void
    secondaryActionLabel?: string
    secondaryAction?: () => void
    form: React.ReactElement
}

const Modal = ({
    modalId,
    isOpen,
    close,
    title,
    description,
    disabled,
    actionLabel,
    onSubmit,
    secondaryActionLabel,
    secondaryAction,
    form
}: FormModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleOnSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!mounted) {
        return null;
    }

    return (
        <div
            id="wrapper"
            className={cn("fixed inset-0 bg-primary/80 items-center justify-center z-50", `${isOpen ? "flex" : "hidden"}`)}
        >
            <Card
                id={modalId}
                className={cn("max-w-md w-full md:max-w-lg",
                    `${isOpen && "animate-zoom-in"}`
                )}
            >
                <CardHeader className="relative pt-2 pb-3">
                    <div
                        className="absolute top-4 right-4 hover:scale-110"
                        onClick={close}
                    >
                        <XIcon />
                    </div>
                    <CardTitle className="text-xl select-none">{title}</CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                    <Separator />
                </CardHeader>
                <CardContent className="max-h-[60dvh] mb-2 overflow-y-scroll">
                    {form}
                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                    {
                        secondaryAction && secondaryActionLabel &&
                        (<Button
                            size="sm"
                            disabled={disabled}
                            variant="outline"
                            onClick={handleSecondaryAction}
                        >
                            {secondaryActionLabel}
                        </Button>)
                    }
                    <Button
                        size="sm"
                        disabled={disabled}
                        variant="default"
                        onClick={handleOnSubmit}
                    >
                        {actionLabel}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Modal