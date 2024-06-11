import { getHashtags } from "@/actions/getHashtags";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import HashTagLink from "./[hashtagName]/_components/hashtag-link";

export const revalidate = 5;

const TagsPage = async () => {
    const tags = await getHashtags();

    // index of tags
    const firstLetters = tags.map(tag => tag.name.slice(0, 1));
    const tagIndexes = firstLetters.filter((letter, index) => firstLetters.indexOf(letter.toUpperCase()) === index);

    return (
        <div className="container-div">
            <Heading
                title="Tags List"
                description="looking for food map by the tag."
            />
            <Separator />
            <div className="mt-4 flex flex-wrap gap-8">
                {tagIndexes.map(tagIndex => (
                    <div key={tagIndex}>
                        <div className="text-xl font-bold">{tagIndex}</div>
                        <HashTagLink
                            tags={tags}
                            tagIndex={tagIndex}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TagsPage;