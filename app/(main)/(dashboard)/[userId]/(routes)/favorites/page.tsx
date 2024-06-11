
import { getFavorites } from "@/actions/getFavorites";
import Heading from "@/components/Heading";
import FavoriteList from "./_components/favorite-list";
import { Separator } from "@/components/ui/separator";
import EmptyList from "./_components/list-empty";

export const revalidate = 0;

const FavoritePage = async () => {
    const favorites = await getFavorites();

    return (
        <div>
            <Heading
                title={`My Favorites (${favorites.length})`}
                description="The list of my favorite food maps."
            />
            <Separator />
            <FavoriteList favorites={favorites} />
            {favorites.length === 0 && <EmptyList />}
        </div>
    );
}

export default FavoritePage;

