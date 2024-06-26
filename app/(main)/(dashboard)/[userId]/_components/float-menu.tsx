'use client';

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ArrowBigLeftDash, LayoutDashboard, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import TooltipButton from "@/components/TooltipButton";
import { useRef, useState } from "react";
import { floatMenuVariants } from "@/lib/animation";

const FloatMenu = () => {
    const ref = useRef(null);
    const pathname = usePathname();
    const router = useRouter();
    const auth = useAuth();
    const userId = auth.userId;
    const [expand, setExpand] = useState(false);

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 w-full pb-4 pointer-events-none md:hidden">
            <motion.div
                ref={ref}
                className="w-full flex justify-center"
            >
                <motion.div
                    className={cn("relative w-max max-w-full bg-primary/90 rounded-lg flex items-center space-x-2 px-2 outline outline-offset-1 pointer-events-auto transition-opacity cursor-grab",
                        expand
                            ? "opacity-100"
                            : "opacity-30 hover:opacity-100"
                    )}
                    initial={false}
                    animate={expand ? "expand" : "init"}
                    variants={floatMenuVariants}
                    drag="x"
                    dragConstraints={ref}
                >
                    <Button
                        variant="secondary"
                        size="sm"
                        className="my-2 aspect-square rounded-full p-2"
                        onClick={() => setExpand((current) => !current)}
                    >
                        {expand ? <X /> : <Menu />}
                    </Button>
                    <div className={cn("w-max h-full flex items-center space-x-2", expand ? "flex" : "hidden")}>
                        <div className="relative py-2">
                            <Button
                                onClick={() => router.push(`/${userId}`)}
                                className={cn(buttonVariants({
                                    variant: pathname === `/${userId}` ? "active" : "secondary"
                                }))}
                            >
                                <div className="relative flex items-center gap-2">
                                    <LayoutDashboard size={18} />
                                    <p className="font-semibold text-xs uppercase sm:text-sm">
                                        Dashboard
                                    </p>
                                </div>
                            </Button>
                        </div>
                        <div className="h-full py-2">
                            <div className="h-full w-[2px] rounded-xl bg-secondary"></div>
                        </div>
                        {routes.map(route => (
                            <div key={route.href} className="py-2">
                                <TooltipButton content={route.label}>
                                    <Button
                                        onClick={() => {
                                            router.push(`/${userId}/${route.href}`)
                                        }}
                                        className={cn(buttonVariants({
                                            variant: pathname === `/${userId}/${route.href}` ? "active" : "secondary"
                                        }))}
                                    >
                                        <route.icon className="size-3 sm:size-4" />
                                    </Button>
                                </TooltipButton>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default FloatMenu;