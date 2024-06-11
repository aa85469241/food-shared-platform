'use client';

import { motion } from "framer-motion";
import { screenFadeIn } from "@/lib/animation";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";
import { FoodMapValues } from "../modals/FormModal";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef } from "react";

type DescriptionValues = {
    title: string
    description: string
    lowestPrice: number
    highestPrice: number
}

type DescriptionFormProps = {
    lowestPrice: number
    highestPrice: number
    register: UseFormRegister<FoodMapValues>
    errors: FieldErrors<DescriptionValues>
}

const DescriptionForm = ({
    lowestPrice,
    highestPrice,
    register,
    errors
}: DescriptionFormProps) => {
    return (
        <motion.div
            className="w-full overflow-y-scroll"
            initial={screenFadeIn.initial}
            animate={screenFadeIn.animate}
            transition={screenFadeIn.transition}
        >
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold">
                    2. How to description this food ?
                </h1>
                <div>
                    <Label className="mb-1">Food Name:</Label>
                    <Input {...register("title", { required: true })} />
                    {errors.title
                        && <p className="text-destructive text-sm mt-1 pl-2 font-medium">
                            {errors.title.message}
                        </p>
                    }
                </div>
                <div>
                    <Label className="mb-1">Description:</Label>
                    <Textarea
                        id="textarea"
                        className="max-h-40 whitespace-pre-wrap"
                        {...register("description", { required: true })}
                    />
                    {errors.description
                        && <p className="text-destructive text-sm mt-1 pl-2 font-medium">
                            {errors.description.message}
                        </p>
                    }
                </div>
                <div>
                    <div>
                        <Label className="mb-1">Price Range:</Label>
                        <div className="w-full flex items-center gap-2">
                            <div className="text-sm font-semibold">NT$</div>
                            <Input
                                type="number"
                                placeholder="Min"
                                {...register("lowestPrice", {
                                    setValueAs: v => parseInt(v)
                                })}
                            />
                            <div>~</div>
                            <div className="text-sm font-semibold">NT$</div>
                            <Input
                                type="number"
                                placeholder="Max"
                                {...register("highestPrice", {
                                    setValueAs: v => parseInt(v)
                                })}
                            />
                        </div>
                    </div>
                    {(errors.lowestPrice || errors.highestPrice)
                        && <p className="text-destructive text-sm mt-1 pl-2 font-medium">
                            *Both Lowest and Highest price are required.
                        </p>
                    }
                    {(lowestPrice > highestPrice)
                        && <p className="text-destructive text-sm mt-1 pl-2 font-medium">
                            *Lowest price cannot greater than highest price.
                        </p>
                    }
                </div>
            </div>
        </motion.div>
    );
}

export default DescriptionForm;