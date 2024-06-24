
import { getProfile } from "@/actions/getProfile"
import { getMaps } from "@/actions/getMaps"
import { FileText, MessageSquareMore, ThumbsUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/Heading"
import CommentsCard from "../_components/cards/comments-card"
import FavoritesCard from "../_components/cards/favorites-card"
import OverviewCard from "../_components/cards/overview-card"
import PersonalCard from "../_components/cards/personal-card"
import TimeLine from "../_components/cards/timeline"
import DangerZone from "@/app/(main)/(client)/(routes)/maps/[mapId]/_components/danger-zone"

export const revalidate = 0;

const Dashboard = async () => {
    const profile = await getProfile();
    const maps = await getMaps();
    const myMaps = maps.filter(map => map.profileId === profile.id);

    const beLikes = myMaps.flatMap(item => item.favorites);
    const commentsForYou = myMaps.flatMap(item => item.comments)

    return (
        <div className="pb-4">
            <Heading
                title="Dashboard"
                description="Organize your personal data here."
            />
            <Separator />
            <div className="h-full flex flex-col space-y-6 pt-8">
                <div className="w-full grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="w-full grid grid-cols-2 gap-2">
                        <OverviewCard
                            description="Published Food Map"
                            color="#ffce73"
                            data={profile.maps}
                            amount={profile.maps.length}
                            icon={<FileText color="#ffce73" />}
                        />
                        <OverviewCard
                            description="Your Map be Liked"
                            color="#87CEFA"
                            data={beLikes}
                            amount={beLikes.length}
                            icon={<ThumbsUp color="#87CEFA" />}
                        />
                        <OverviewCard
                            description="Comments you got"
                            color="#48ecc0"
                            data={commentsForYou}
                            amount={commentsForYou.length}
                            icon={<MessageSquareMore color="#48ecc0" />}
                        />
                        <PersonalCard data={profile} />
                    </div>
                    <TimeLine maps={profile.maps} />
                    <CommentsCard comments={profile.comments} />
                    <FavoritesCard favorites={profile.favorites} />
                </div>
            </div>
            <DangerZone userId={profile.userId} />
        </div>
    )
}

export default Dashboard