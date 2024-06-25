'use client';

import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpLeftFromCircle, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { toast } from "./ui/use-toast";

type UserMenuProps = {
    userImageUrl: string | undefined
}

const UserMenu = ({ userImageUrl }: UserMenuProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const currentPage = pathname.split('/')[2]
    const { user } = useUser();
    const { signOut } = useClerk();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={userImageUrl || undefined} />
                    <AvatarFallback>
                        <Skeleton />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2">
                <DropdownMenuItem
                    className={cn("mb-1", pathname === `/${user?.id}` && "bg-primary text-white")}
                    onClick={() => router.push(`/${user?.id}`)}
                >
                    <p className="font-bold">Dashboard</p>
                    <DropdownMenuShortcut>
                        <LayoutDashboard size={15} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuGroup className="pl-2 space-y-1">
                    {routes.map((item) => (
                        <DropdownMenuItem
                            key={item.label}
                            className={cn(currentPage === item.href && "bg-primary text-white")}
                            onClick={() => router.push(`/${user?.id}/${item.href}`)}
                        >
                            <p className="font-bold text-xs">
                                {item.label}
                            </p>
                            <DropdownMenuShortcut>
                                <item.icon size={15} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex items-center justify-end space-x-2"
                    onClick={() => {
                        signOut()
                            .then(() => {
                                toast({
                                    title: "Sign out successfully",
                                })

                                router.push("/")
                                router.refresh();
                            })
                    }}>
                    <ArrowUpLeftFromCircle size={15} className="text-destructive" />
                    <p className="font-bold text-destructive">Sign out</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserMenu;