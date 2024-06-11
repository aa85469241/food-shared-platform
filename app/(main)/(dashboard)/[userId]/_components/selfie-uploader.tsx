'use client';

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { CameraIcon, Check, X } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

type SelfieUploaderProps = {
    selfie: string
    className?: string
}

const SelfieUploader = ({ selfie, className }: SelfieUploaderProps) => {
    const router = useRouter();
    const { user } = useUser();
    const [imageUrl, setImageUrl] = useState<string | undefined>();

    const uploadSelfie = async () => {
        try {
            await axios.patch(`/api/auth/${user?.id}/update-user-image`, {
                imageUrl: imageUrl
            })
            toast({
                title: "Your selfie has been updated."
            })
            router.refresh();
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setImageUrl(undefined)
        }
    }

    return (
        <div className={className}>
            <div className="relative flex">
                {imageUrl
                    &&
                    <div className="flex flex-col justify-between">
                        <button
                            type="submit"
                            className="aspect-square bg-success border rounded-full p-1 hover:scale-110"
                            onClick={uploadSelfie}
                        >
                            <Check size={15} className="text-white" />
                        </button>
                        <button
                            className="aspect-square bg-destructive border rounded-full p-1 hover:scale-110"
                            onClick={() => setImageUrl(undefined)}
                        >
                            <X size={15} className="text-white" />
                        </button>
                    </div>}
                <Avatar className="relative w-20 h-20 border-2 md:w-24 md:h-24">
                    <AvatarImage
                        src={selfie}
                        alt="selfie"
                        width={200}
                        height={200}
                    />
                    <CldUploadWidget
                        uploadPreset="tovnzfn9"
                        onSuccess={(result: any) => {
                            setImageUrl(result.info.secure_url)
                        }}
                    >
                        {({ open }) => {
                            return (
                                <>
                                    {imageUrl
                                        ?
                                        <div className="absolute inset-0">
                                            <Image
                                                src={imageUrl}
                                                alt="uploading-image"
                                                fill
                                                sizes="auto"
                                                className="rounded-full aspect-square"
                                            />
                                        </div>
                                        :
                                        <div
                                            className="flex items-center justify-center absolute inset-0 bg-white/50 cursor-pointer opacity-0 transition-opacity hover:opacity-100"
                                            onClick={() => open()}
                                        >
                                            <CameraIcon />
                                        </div>}
                                </>
                            )
                        }}
                    </CldUploadWidget>
                </Avatar>
            </div>
        </div>
    );
}

export default SelfieUploader;