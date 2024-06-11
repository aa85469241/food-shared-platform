import { getMapsByTag } from "@/actions/getMapsByTag"
import { getProfile } from "@/actions/getProfile";
import MapCard from "@/app/(main)/(client)/_components/map-card";
import Heading from "@/components/Heading";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

export const revalidate = 5;

type TagPageProps = {
    params: {
        hashtagName: string
    }
}

const TagPage = async ({ params }: TagPageProps) => {
    const profile = await getProfile();
    const foodMaps = await getMapsByTag(params.hashtagName);
    const tagName = decodeURIComponent(params.hashtagName)

    return (
        <div className="container-div space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/maps/tags">Tags</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{tagName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="space-y-2">
                <h1 className="text-xl font-semibold md:text-2xl">
                    Tagged with: {tagName}
                </h1>
                <Separator />
            </div>
            <div className="mt-4 w-full grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
                {foodMaps.map(item => (
                    <MapCard
                        key={item.id}
                        data={item}
                        currentUser={profile}
                    />
                ))}
            </div>
        </div>
    );
}

export default TagPage;