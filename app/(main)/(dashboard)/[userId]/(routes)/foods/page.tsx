import { getMaps } from "@/actions/getMaps";
import { getProfile } from "@/actions/getProfile";

import { Separator } from "@/components/ui/separator";
import Heading from "@/components/Heading";
import FoodList from "./_components/food-list";
import { getHashtags } from "@/actions/getHashtags";

export const revalidate = 0;

const FoodPage = async () => {
    const profile = await getProfile();
    const maps = await getMaps();
    const hashtags = await getHashtags();

    const userMaps = maps.filter(item => item.profileId === profile.id)

    return (
        <div className="h-full">
            <Heading
                title={`Food List (${userMaps.length})`}
                description="organize your own food map here."
            />
            <Separator />
            <div className="h-full mt-4">
                <FoodList
                    maps={userMaps}
                    hashtags={hashtags}
                />
            </div>
        </div>
    );
}

export default FoodPage;