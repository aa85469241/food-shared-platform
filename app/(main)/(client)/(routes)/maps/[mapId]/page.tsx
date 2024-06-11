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
    const commentsThisMap = comments.filter(c => c.mapId === params.mapId);

    const profile = await getProfile();
    const initialValues = profile.comments.find(c => c.mapId === params.mapId);

    return (
        <div className="container-div">
            <FoodClientPage
                map={map}
                comments={commentsThisMap}
                currentUser={profile}
            />
            <CommentModal initialValues={initialValues} />
        </div>
    );
}

export default FoodPage;