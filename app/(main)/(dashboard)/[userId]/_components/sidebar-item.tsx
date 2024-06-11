'use client';

import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type SidebarItemProps = {
    label: string
    Icon: LucideIcon
    href: string
}

const SidebarItem = ({ label, Icon, href }: SidebarItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const auth = useAuth();

    const isActive = pathname === `/${auth.userId}/${href}` || pathname.endsWith(href) || (pathname === `/${auth.userId}` && href === "/")

    const handleOnClick = () => {
        router.push(`/${auth.userId}/${href}`)
    }

    return (
        <button
            disabled={isActive}
            className={cn("h-12 bg-primary text-background rounded-l-full p-2 hover:bg-secondary/80 hover:text-primary lg:p-4", isActive && "bg-background text-primary")}
            onClick={handleOnClick}
        >
            <div className="w-full h-full w-layout-hflex justify-start gap-x-2">
                <Icon size={20} />
                <p className="font-semibold whitespace-nowrap">{label}</p>
            </div>
        </button>
    );
}

export default SidebarItem;