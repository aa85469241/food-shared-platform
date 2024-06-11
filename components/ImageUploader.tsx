'use client';

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "./ui/button";
import { CircleFadingPlus, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
    value: string
    onChange: (value: string) => void
    onRemove: (value: string) => void
}

const ImageUploader = ({
    value,
    onChange,
    onRemove,
}: ImageUploaderProps) => {

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    return (
        <div className="flex items-center gap-4">
            {value &&
                <div className="relative h-32 w-48 border rounded-md overflow-hidden">
                    <Image
                        src={value}
                        alt="uploadcare-iamge"
                        fill
                        sizes="auto"
                        className="object-cover"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => onRemove(value)}
                    >
                        <XIcon />
                    </Button>
                </div>
            }
            <CldUploadWidget
                uploadPreset="isi12je8"
                onSuccess={onUpload}
            >
                {({ open }) => {
                    return (
                        <div
                            className={cn(`${value && "hidden"}`,
                                "w-32 h-24 border-2 border-dashed rounded-md p-2"
                            )}
                            onClick={() => open()}>
                            <div className="h-full flex flex-col gap-1 items-center justify-center cursor-pointer">
                                <CircleFadingPlus />
                                <p className="text-xs w-24 text-center pointer-events-none">
                                    Click to upload image
                                </p>
                            </div>
                        </div>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUploader