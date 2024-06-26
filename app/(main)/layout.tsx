import { getHashtags } from "@/actions/getHashtags";
import { getProfile } from "@/actions/getProfile"
import Navbar from "@/components/Navbar"
import FormModal from "@/components/modals/FormModal"


export default async function MainLayout({
    children
}: {
    children: React.ReactNode
}) {
    const profile = await getProfile();
    const hashtags = await getHashtags();

    return (
        <div>
            <FormModal hashtags={hashtags} />
            <Navbar userImageUrl={profile ? profile.imageUrl : undefined} />
            <main>
                {children}
            </main>
        </div>
    )
}