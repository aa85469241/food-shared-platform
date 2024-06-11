'use client';

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Image as ImageValue } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type TabsImageGalleryProps = {
    images: ImageValue[]
}

const TabsImageGallery = ({
    images
}: TabsImageGalleryProps) => {
    const [currentImage, setCurrentImage] = useState<string>(images[0].id);

    return (
        <div className="w-full">
            <Tabs defaultValue={currentImage}>
                {images.map((image) => (
                    <TabsContent
                        key={image.id}
                        value={image.id}
                    >
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Card>
                                    <CardContent className="relative h-64 md:h-80">
                                        <Image
                                            src={image.imgUrl}
                                            alt={image.id}
                                            fill
                                            sizes="auto"
                                            className="object-cover rounded-md"
                                        />
                                    </CardContent>
                                </Card>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-md max-h-[80dvh] grid grid-rows-[95%_auto] place-content-center rounded-md py-8">
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={image.imgUrl}
                                        alt={image.id}
                                        width={400}
                                        height={300}
                                        className="h-full object-cover rounded-md"
                                    />
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogAction className="w-full">Close</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TabsContent>
                ))}
                <TabsList className="w-full h-full grid grid-cols-5 gap-2 bg-transparent px-0">
                    {images.map((image) => (
                        <TabsTrigger
                            key={image.id}
                            value={image.id}
                            className={cn("relative w-full h-full aspect-square p-0",
                                currentImage === image.id && "border-4 border-success"
                            )}
                            onClick={() => setCurrentImage(image.id)}
                        >
                            <Image
                                src={image.imgUrl}
                                alt={image.id}
                                fill
                                sizes="auto"
                                className="object-cover rounded-sm"
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}

export default TabsImageGallery;