import { getProfile } from "@/actions/getProfile";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import CommentAccordion from "./_components/comment-accordion";
import { getComments } from "@/actions/getComments";
import EmptyList from "./_components/list-empty";
import CommentsList from "./_components/comments-list";

export const revalidate = 5;

const Comments = async () => {
    const profile = await getProfile();
    const allComments = await getComments();
    const comments = allComments.filter(c => c.profileId === profile.id)

    return (
        <div className="h-full">
            <Heading
                title={`My Comments (${comments.length})`}
                description="manage your comments"
            />
            <Separator />
            <CommentsList comments={comments} />
            {comments.length === 0 && <EmptyList />}
        </div>
    );
}

export default Comments;