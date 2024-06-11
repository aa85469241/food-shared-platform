'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { Images, Trash2Icon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { screenFadeIn } from "@/lib/animation";
import { FieldErrors } from "react-hook-form";

type ImageValueProps = {
    images: {
        url: string
    }[]
}

type ImageFormProps = {
    values: string[]
    onChange: (value: string) => void
    onRemove: (value: string) => void
    errors: FieldErrors<ImageValueProps>
}

const ImageForm = ({
    values,
    onChange,
    onRemove,
    errors,
}: ImageFormProps) => {
    const onUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange])

    return (
        <motion.div
            className="w-full overflow-y-scroll"
            initial={screenFadeIn.initial}
            animate={screenFadeIn.animate}
            transition={screenFadeIn.transition}
        >
            <h1 className="font-semibold">
                3. Upload the pictures of the food.
            </h1>
            <div className="w-full grid grid-cols-3 gap-2 mt-2 mb-4">
                {values.map((value, index) => (
                    <div
                        key={index}
                        className="relative w-full aspect-square shadow-md border border-neutral-500/30 rounded-md"
                    >
                        <Image
                            src={value}
                            alt={`food-image-${index}`}
                            fill
                            sizes="auto"
                            className="object-cover rounded-md"
                        />
                        <button
                            type="button"
                            className="absolute top-0 right-0 translate-x-1 -translate-y-1 p-1 bg-red-700 text-white rounded-md transition-colors hover:bg-red-500"
                            onClick={() => onRemove(value)}
                        >
                            <Trash2Icon size={18} />
                        </button>
                    </div>
                ))}
            </div>
            {values.length !== 6 && <CldUploadWidget
                uploadPreset="isi12je8"
                onSuccess={onUpload}
                options={{ maxFiles: 6 }}
            >
                {({ open }) => {
                    return (
                        <div
                            className="w-full h-48 border-2 border-dotted cursor-pointer rounded-md"
                            onClick={() => open()}
                        >
                            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                                <Images size={50} />
                                <div className="font-semibold">
                                    <span className="text-cyan-700 font-bold">
                                        Click
                                    </span> here to upload the image.
                                </div>
                                <div className="text-sm text-primary/60">Max 6 files are allowed</div>
                                {(errors && values.length === 0) && <p className="text-destructive text-sm mt-1 pl-2 font-medium">
                                    {errors.images?.message}
                                </p>}
                            </div>
                        </div>
                    )
                }}
            </CldUploadWidget>}
        </motion.div>
    );
}

export default ImageForm;