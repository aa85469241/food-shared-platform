"use client";

import { CommentValue, FoodMap, TProfile } from "@/types";
import TabsImageGallery from "./tabs-image-gallery";
import InfoSection from "./info-section";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import MapCommentsList from "./map-comments-list";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

type FoodClientPageProps = {
    map: FoodMap
    comments: CommentValue[]
    currentUser: TProfile
}

const FoodClientPage = ({
    map,
    comments,
    currentUser
}: FoodClientPageProps) => {
    const auth = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <div className="w-full">
            <Breadcrumb className="mb-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" >Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{map.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="w-full grid grid-cols-1 md:grid-cols-[40%_auto] gap-4 md:gap-12">
                <TabsImageGallery images={map.images} />
                <InfoSection
                    map={map}
                    comments={comments}
                    currentUser={currentUser}
                />
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <Label className="text-xl font-bold">Comments:</Label>
                {auth.isSignedIn
                    ? <MapCommentsList
                        comments={comments}
                        currentUser={currentUser}
                    />
                    : <div className="w-full text-center font-semibold">
                        You have to <Link href="/auth/sign-in" className="font-bold underline">sign in</Link> to see the comments.
                    </div>
                }
            </div>
        </div>
    );
}

export default FoodClientPage;