'use client';

import Image from "next/image";
import { TProfile } from "@/types";
import { Cake, CalendarDays, UserCog } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";

type MapOwnerInfoCardProps = {
    profile: TProfile
}

const MapOwnerInfoCard = ({
    profile
}: MapOwnerInfoCardProps) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="w-fit flex items-center gap-x-2 font-semibold cursor-pointer hover:underline">
                    <UserCog size={20} /> {profile.name}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-sm">
                <div className="w-full grid grid-cols-[20%_auto]">
                    <div className="relative w-24 h-24 border-2 rounded-sm">
                        <Image
                            src={profile.imageUrl}
                            alt={profile.name}
                            fill
                            sizes="auto"
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full flex flex-col items-center pt-2">
                        <h1 className="text-lg font-bold">
                            {profile.firstName} {profile.lastName}
                        </h1>
                        <div className="flex items-center gap-x-2">
                            <Cake size={18} /> {format(new Date(profile.birth!), "yyyy-MM-dd")}
                        </div>
                        <div>{profile.description}</div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-x-2 text-sm">
                    <CalendarDays size={18} /> Joined {format(profile.createdAt, "PPP")}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MapOwnerInfoCard;