'use client';

import Link from 'next/link'
import {
    motion,
    useAnimate,
    useMotionValueEvent,
    useScroll,
    useSpring
} from 'framer-motion';
import { CircleUser } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import TooltipButton from './TooltipButton';
import { useModal } from '@/hooks/useModal';
import { toast } from './ui/use-toast';
import UserMenu from './UserMenu';

type NavbarProps = {
    userImageUrl: string | undefined
}

const Navbar = ({ userImageUrl }: NavbarProps) => {
    const auth = useAuth();
    const modal = useModal();

    // animation
    const { scrollYProgress, scrollY } = useScroll();
    const scroll = useSpring(scrollYProgress, { stiffness: 30 })
    const [scope, animate] = useAnimate()

    let oldScrollY = 0

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (oldScrollY < latest) {
            animate(scope.current, {
                y: "-75%"
            }, { type: "spring", stiffness: 100, damping: 20 })
        } else {
            animate(scope.current, {
                y: "0",
            }, { type: "spring", stiffness: 100, damping: 20 })
        }

        oldScrollY = window.scrollY;
    })

    return (
        <header
            id="header"
            ref={scope}
            className="h-[85px] fixed top-0 inset-x-0 bg-background z-30"
        >
            <div className="w-full px-[8vw] mx-auto">
                <div className="w-layout-vflex gap-3">
                    <div className="w-full w-layout-hflex items-center justify-between pt-3">
                        <div>
                            <Link href="/">
                                <div className="relative w-layout-vflex">
                                    <div className="text-xl font-bold">
                                        <div>FoodMap</div>
                                    </div>
                                    <div className="text-xs font-semibold self-end tracking-wider">Share with</div>
                                </div>
                            </Link>
                        </div>
                        <div className="relative w-layout-hflex space-x-4">
                            <button
                                className="p-2 px-3 shadow rounded-3xl border active:shadow-inner cursor-pointer"
                                onClick={() => {
                                    if (!auth.isSignedIn) {
                                        toast({
                                            title: "You must be Signed in",
                                            description: "Please click signIn button right beside to signIn first.",
                                        })
                                    } else {
                                        modal.open();
                                    }
                                }}
                            >
                                <div className="text-xs font-semibold select-none md:text-sm">Share your food</div>
                            </button>
                            {auth.isSignedIn
                                ? <UserMenu userImageUrl={userImageUrl} />
                                : <Link href="/auth/sign-in">
                                    <TooltipButton content="sign in">
                                        <CircleUser
                                            className="hover:drop-shadow-md"
                                            size={30}
                                        />
                                    </TooltipButton>
                                </Link>
                            }
                        </div>
                    </div>
                    <div id="scroll-progress-wrapper" className="w-full gap-2 flex items-center">
                        <span className="text-xs font-medium">0%</span>
                        <div id="scroll-progress" className="relative h-1 w-full overflow-hidden rounded-full bg-primary/20">
                            <motion.div
                                className="h-full w-full flex-1 bg-primary/60 origin-left"
                                style={{ scaleX: scroll }}
                            ></motion.div>
                        </div>
                        <span className="text-xs font-medium">100%</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar