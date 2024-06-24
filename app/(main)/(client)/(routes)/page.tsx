
import { Query, getMaps } from "@/actions/getMaps";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import SearchFilter from "../_components/search-filter";
import { getProfile } from "@/actions/getProfile";
import MapList from "../_components/map-list";

export const revalidate = 5;

type HomeProps = {
    searchParams: Query
}

const Home = async ({ searchParams }: HomeProps) => {
    const currentUser = await getProfile();
    const maps = await getMaps({
        country: searchParams.country,
        minPrice: searchParams.minPrice,
        maxPrice: searchParams.maxPrice,
        isPublic: true,
        favorite: searchParams.favorite
    });

    return (
        <div className="container-div scrollbar-hide">
            <Heading
                title="Food Map"
                description="Explore the food that you would like to."
            />
            <Separator />
            <SearchFilter id={currentUser?.id} />
            <MapList
                currentUser={currentUser}
                maps={maps}
            />
        </div>
    );
}

export default Home;
