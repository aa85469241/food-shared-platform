'use client';

import { useMemo } from "react";
import { motion } from "framer-motion"
import { cities } from "@/lib/taiwan-cities";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "../ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import dynamic from "next/dynamic";
import { screenFadeIn } from "@/lib/animation";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { FoodMapValues } from "../modals/FormModal";
import { Label } from "../ui/label";

export type CitySelectValue = {
    name: string
    code: number
    latlng: number[]
}

type LocationFormValue = {
    country: string
}

type LocationFormProps = {
    register: UseFormRegister<FoodMapValues>
    control: Control<FoodMapValues>
    country: string
    errors: FieldErrors<LocationFormValue>
}

const LocationForm = ({ register, control, country, errors }: LocationFormProps) => {

    const selected = cities.find((city) => city.name === country);

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [country]);

    return (
        <motion.div
            className="h-full flex flex-col gap-y-4 px-1 pb-2 overflow-y-scroll"
            initial={screenFadeIn.initial}
            animate={screenFadeIn.animate}
            transition={screenFadeIn.transition}
        >
            <h1 className="font-semibold">
                1. Where is that food located?
            </h1>
            <div>
                <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="pointer-events-auto">
                                <SelectValue placeholder="Select the country" />
                            </SelectTrigger>
                            <SelectContent className="max-h-56">
                                <SelectGroup>
                                    <SelectLabel>Country</SelectLabel>
                                    {cities.map((city: CitySelectValue) => (
                                        <SelectItem
                                            key={city.code}
                                            value={city.name}
                                        >
                                            {city.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.country
                    && <p className="text-destructive text-sm mt-1 pl-2 font-medium">
                        {errors.country?.message}
                    </p>}
            </div>
            {country && (
                <div className="flex flex-col">
                    <div>
                        <Label className="mb-1">Address:</Label>
                        <div className="flex items-center">
                            <Input
                                disabled
                                value={country}
                                className="w-20 text-center"
                            />
                            <div className="mx-1">-</div>
                            <Input
                                placeholder="Address (option)"
                                {...register("address")}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full h-56 md:h-64">
                <Map
                    position={selected?.latlng}
                    content={selected?.name}
                />
            </div>
        </motion.div>
    );
}
export default LocationForm;