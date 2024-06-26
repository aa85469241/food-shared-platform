'use client';

import Image from "next/image";
import { TProfile } from "@/types";
import { Cake, CalendarDays, UserCog } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

type MemberInfoCardProps = {
    profile: TProfile
}

const MemberInfoCard = ({
    profile
}: MemberInfoCardProps) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="w-fit flex items-center gap-x-2 font-semibold cursor-pointer hover:underline">
                    <UserCog size={20} /> {profile.name}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-sm">
                <div className="w-full grid grid-cols-[20%_auto]">
                    <div className="relative w-20 h-20 border-2 rounded-sm md:w-24 md:h-24">
                        <Image
                            src={profile.imageUrl}
                            alt={profile.name}
                            fill
                            sizes="auto"
                            className="object-cover"
                        />
                        <Skeleton />
                    </div>
                    <div className="w-full flex flex-col items-center pt-1">
                        <h1 className="text-lg font-bold">
                            {profile.firstName} {profile.lastName}
                        </h1>
                        <div className="flex items-center gap-x-2 text-sm mb-1">
                            <Cake size={15} /> {format(new Date(profile.birth!), "yyyy-MM-dd")}
                        </div>
                        <div className="text-sm font-semibold">{profile.description}</div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-x-2 text-sm">
                    <CalendarDays size={18} /> Joined {format(profile.createdAt, "PPP")}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MemberInfoCard;