'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Image as ImageValue } from "@prisma/client";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type ImageGalleryProps = {
    images: ImageValue[]
}

const ImageGallery = ({
    images
}: ImageGalleryProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [count, setCount] = useState(0);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })

    }, [api])

    return (
        <Carousel setApi={setApi} className="relative">
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem key={image.id}>
                        <div className="relative h-36 md:h-48 rounded-md overflow-hidden">
                            <Image
                                src={image.imgUrl}
                                alt={image.id}
                                fill
                                sizes="auto"
                                className="object-cover rounded-lg cursor-grab"
                            />
                        </div>
                    </CarouselItem>
                ))}
                <Skeleton />
            </CarouselContent>
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-2">
                {Array.from({ length: count })
                    .map((_, index) => (
                        <div
                            key={index}
                            className={cn("w-3.5 h-3.5 rounded-full border-2 bg-secondary/50", (index + 1) === current && "bg-success")}
                        ></div>
                    ))}
            </div>
        </Carousel>
    );
}

export default ImageGallery;