import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { TProfile } from "@/types";


interface IUseFavoriteProps {
    currentUser: TProfile
    mapId: string
}

export const useFavorite = ({
    currentUser,
    mapId,
}: IUseFavoriteProps) => {
    const router = useRouter();
    const [onToggle, setOnToggle] = useState(false);

    const favoriteIds = currentUser?.favorites.map(f => f.map.id);
    const ownMapIds = currentUser?.maps.map(m => m.id);

    const isFavorite = useMemo(() => {
        const list = favoriteIds || [];

        return list.includes(mapId);
    }, [favoriteIds, mapId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            router.push("/auth/sign-in")
            return;
        }

        if (ownMapIds.includes(mapId)) {
            toast({
                title: "This is your own map."
            })

            return;
        }

        try {
            setOnToggle(true);

            if (!isFavorite) {
                await axios.post(`/api/favorites/toggle-favorite/${mapId}`, {
                    mapId: mapId
                })
            } else {
                await axios.delete(`/api/favorites/toggle-favorite/${mapId}`)
            }
            toast({
                title: 'Toggle Favorite success.'
            })
            router.refresh();
        }
        catch (err) {
            toast({
                title: "Error occurred!",
                description: `${err}`
            })
        }
        finally {
            setOnToggle(false);
        }

    }, [
        currentUser,
        isFavorite,
        mapId,
        router,
        ownMapIds
    ])

    return {
        onToggle,
        isFavorite,
        toggleFavorite
    }
}

export default useFavorite