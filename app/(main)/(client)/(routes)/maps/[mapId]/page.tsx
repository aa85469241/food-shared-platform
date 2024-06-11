import { getMap } from "@/actions/getMap"
import FoodClientPage from "./_components/client";
import { getComments } from "@/actions/getComments";
import CommentModal from "@/components/modals/CommentModal";
import { getProfile } from "@/actions/getProfile";

export const revalidate = 0;

type FoodPageProps = {
    params: {
        mapId: string
    }
}

const FoodPage = async ({
    params
}: FoodPageProps) => {
    const map = await getMap(params.mapId);
    const comments = await getComments();
    const profile = await getProfile();
    
    const commentsThisMap = comments.filter(c => c.mapId === params.mapId);
    const initialComments = profile?.comments.find(c => c.map.id === params.mapId);

    return (
        <div className="container-div">
            <FoodClientPage
                map={map}
                comments={commentsThisMap}
                currentUser={profile}
            />
            <CommentModal initialComments={initialComments} />
        </div>
    );
}

export default FoodPage;