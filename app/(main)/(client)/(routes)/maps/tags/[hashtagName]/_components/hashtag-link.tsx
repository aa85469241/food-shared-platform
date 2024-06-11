'use client';

import { HashTag } from "@prisma/client";
import { useRouter } from "next/navigation";

type HashTagLinkProps = {
    tags: HashTag[]
    tagIndex: string
}

const HashTagLink = ({
    tags,
    tagIndex
}: HashTagLinkProps) => {
    const router = useRouter();
    const tagNames = tags.map(tag => tag.name);
    const tagNamesWithNoDuplicate = tagNames.filter((tag, index) => tagNames.indexOf(tag) === index);

    return (
        <>
            {tagNamesWithNoDuplicate
                .filter((_tagName) => {
                    if (_tagName
                        .toUpperCase()
                        .startsWith(tagIndex.toUpperCase())
                    ) {
                        return true;
                    }
                })
                .map((tagName, index) => (
                    <div
                        key={index}
                        className="w-fit cursor-pointer hover:font-semibold hover:transition-all"
                        onClick={() => router.push(`/maps/tags/${tagName}`)}
                    >
                        #{tagName}
                    </div>
                ))}
        </>
    );
}

export default HashTagLink;