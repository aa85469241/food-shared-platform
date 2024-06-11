'use client'


import { LayoutDashboard } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/lib/constants";


const Sidebar = () => {
    return (
        <div className="hidden h-full pt-[100px] pl-[8vw] bg-primary rounded-tr-md md:w-[250px] lg:w-[300px] md:fixed md:inset-y-0 md:left-0 md:block">
            <div className="flex flex-col space-y-4">
                <div className="font-semibold tracking-wider text-background text-sm lg:text-base">- Home -</div>
                <SidebarItem
                    label="Dashboard"
                    Icon={LayoutDashboard}
                    href="/"
                />
                <Separator />
                <div className="font-semibold tracking-wider text-background text-sm lg:text-base">- Routes -</div>
                {routes.map(route => (
                    <SidebarItem
                        key={route.href}
                        label={route.label}
                        Icon={route.icon}
                        href={route.href}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;