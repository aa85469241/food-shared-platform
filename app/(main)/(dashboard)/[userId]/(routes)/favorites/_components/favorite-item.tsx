import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

type FavoriteItemProps = {
    country: string
    address: string
}

const FavoriteItem = ({
    country,
    address,
}: FavoriteItemProps) => {
    const fullAddress = country + address;

    return (
        <div className="w-full border shadow rounded-md p-2">
            <div className="w-full flex justify-between">
                <div className="flex items-center flex-nowrap font-semibold">
                    <MapPin size={18} />
                    <div>{country}</div>
                    <div>{address}</div>
                </div>
                <div>
                    <Link
                        href={`https://www.google.com/maps/place/${fullAddress}`}
                        className="font-medium text-sm tracking-wide hover:underline hover:underline-offset-1"
                    >
                        map +
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FavoriteItem;