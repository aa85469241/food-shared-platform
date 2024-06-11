
import { getProfile } from "@/actions/getProfile"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/Heading"
import PersonalInfo from "../_components/cards/personal-info"
import FoodListCard from "../_components/cards/food-list-card"
import CommentsCard from "../_components/cards/comments-card"
import FavoritesCard from "../_components/favorites-card"

const Dashboard = async () => {
    const profile = await getProfile();

    return (
        <>
            <Heading
                title="Dashboard"
                description="Organize your personal data here."
            />
            <Separator />
            <div className="h-full flex flex-col space-y-6 pt-8">
                <div className="w-full grid grid-cols-1 gap-6 xl:grid-cols-12">
                    <PersonalInfo data={profile} />
                    <CommentsCard comments={profile.comments} />
                </div>
                <div className="w-full grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <FoodListCard maps={profile.maps} />
                    <FavoritesCard favorites={profile.favorites} />
                </div>
            </div>
        </>
    )
}

export default Dashboard