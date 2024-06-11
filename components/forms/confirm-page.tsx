'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { screenFadeIn } from "@/lib/animation";
import { FoodMapValues } from "../modals/FormModal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { priceFormat } from "@/lib/format";

type ConfirmPageProps = {
    values: FoodMapValues
}

const Heading = ({ title }: { title: string }) => {
    return (
        <div className="w-full flex items-center gap-2 mb-2">
            <div
                id="left-grid-line"
                className="w-1/6 h-0.5 bg-primary rounded-3xl"></div>
            <div className="uppercase font-bold text-lg whitespace-nowrap">
                {title}
            </div>
            <div
                id="right-grid-line"
                className="w-full h-0.5 bg-primary rounded-3xl"></div>
        </div>
    )
}

const ConfirmPage = ({ values }: ConfirmPageProps) => {
    const { country, address, title, description, images, hashTags, lowestPrice, highestPrice } = values;

    return (
        <motion.div
            className="w-full w-layout-vflex gap-y-4"
            initial={screenFadeIn.initial}
            animate={screenFadeIn.animate}
            transition={screenFadeIn.transition}
        >
            <h1 className="font-semibold">
                Last: Make sure that your data all correct.
            </h1>
            <div className="w-full">
                <Heading title="Images" />
                <Carousel className="w-full">
                    <CarouselContent className="ml-1 gap-2">
                        {images.map((image, index) => (
                            <CarouselItem
                                key={index}
                                className="relative w-full h-24 basis-1/3 shadow-md border border-slate-200 rounded-md"
                            >
                                <Image
                                    src={image.imgUrl}
                                    alt={`food-image-${index}`}
                                    fill
                                    sizes="auto"
                                    className="object-contain"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="w-full">
                <Heading title="food information" />
                <div className="w-full w-layout-vflex gap-2 my-2">
                    <div className="w-layout-hflex gap-2">
                        <div className="form-title">Located At: </div>
                        <div className="form-content"> {country}{address}</div>
                    </div>
                    <div className="w-layout-hflex gap-2">
                        <div className="form-title">Name: </div>
                        <div className="form-content">{title}</div>
                    </div>
                    <div className="w-layout-hflex gap-2">
                        <div className="form-title">Description: </div>
                        <div className="form-content whitespace-pre-line">{description}</div>
                    </div>
                    <div className="w-layout-hflex gap-2">
                        <div className="form-title">Price: </div>
                        <div className="form-content">
                            {priceFormat.format(lowestPrice)} ~ {priceFormat.format(highestPrice)}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <Heading title="HashTags" />
                    <div className="w-layout-vflex gap-2 mt-2">
                        <div>
                            <div className="form-title text-success">#Public hashtag</div>
                            <div className="w-layout-hflex flex-wrap gap-2 mt-1">
                                {hashTags.filter(item => item.isPublic === true)
                                    .map((_item, index) => (
                                        <div key={index}>
                                            <div className="form-content">
                                                {_item.name}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div>
                            <div className="form-title text-destructive">#Private hashtag</div>
                            <div className="w-layout-hflex flex-wrap gap-2 mt-2">
                                {hashTags.filter(item => item.isPublic === false)
                                    .map((_item, index) => (
                                        <div key={index}>
                                            <div className="form-content">
                                                {_item.name}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ConfirmPage;