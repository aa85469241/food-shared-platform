'use client';

import axios from "axios";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";
import { useForm } from "react-hook-form";
import { FoodMapSchema } from "@/lib/schema";
import LocationForm from "../forms/location-form";
import ImageForm from "../forms/image-form";
import DescriptionForm from "../forms/description-form";
import HashTagsForm from "../forms/hashtags-form";
import ConfirmPage from "../forms/confirm-page";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { HashTag } from "@prisma/client";

enum STEPS {
    COUNTRY = 0,
    DESCRIPTION = 1,
    IMAGES = 2,
    HASHTAGS = 3,
    CONFIRM = 4,
}

const steps = [
    {
        id: STEPS.COUNTRY,
        name: "COUNTRY",
        fields: ["country"]
    },
    {
        id: STEPS.DESCRIPTION,
        name: "DESCRIPTION",
        fields: ["title", "description", "lowestPrice", "lowestPrice", "confirmPrice"]
    },
    {
        id: STEPS.IMAGES,
        name: "IMAGES",
        fields: ["images"]
    },
    {
        id: STEPS.HASHTAGS,
        name: "HASHTAGS",
        fields: ["hashTags"]
    },
    {
        id: STEPS.CONFIRM,
        name: "CONFIRM",
        fields: []
    }
]

export type FoodMapValues = z.infer<typeof FoodMapSchema>;

type FormModalProps = {
    hashtags: HashTag[] | undefined
}

const FormModal = ({ hashtags }: FormModalProps) => {
    const modal = useModal();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(STEPS.COUNTRY);
    const {
        register,
        control,
        handleSubmit,
        watch,
        trigger,
        getValues,
        setValue,
        reset,
        formState: {
            errors
        }
    } = useForm<FoodMapValues>({
        resolver: zodResolver(FoodMapSchema),
        mode: 'onChange',
        defaultValues: {
            country: '',
            address: '',
            title: "",
            description: "",
            lowestPrice: 0,
            highestPrice: 0,
            images: [],
            hashTags: [],
        }
    })

    const country = watch("country")
    const images = watch("images")
    const hashTags = watch("hashTags")
    const lowestPrice = watch("lowestPrice")
    const highestPrice = watch("highestPrice")

    const onSubmit = async (values: FoodMapValues) => {
        try {
            setLoading(true);
            await axios.post("/api/maps", values);
            toast({
                title: "Share your food success!!",
                description: "You've successfully post your food map, you can check details in profile page up right corner."
            })
            router.refresh();
        }
        catch (err) {
            toast({
                title: "Post Failed",
                description: `${err}`
            })
        }
        finally {
            setLoading(false);
            onClose();
        }
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    type FieldName = keyof FoodMapValues

    const onNext = async () => {
        const fields = steps[step].fields;
        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return;

        if (step === steps.length - 1) {
            handleSubmit(onSubmit)()
        } else {
            setStep((value) => value + 1);
        }
    }

    const onClose = () => {
        setStep(STEPS.COUNTRY);
        reset();
        modal.close();
    }


    const actionLabel = useMemo(() => {
        if (step === steps.length - 1) {
            return 'Submit'
        }

        return "Next"
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.COUNTRY) {
            return undefined;
        }

        return 'Back'
    }, [step])

    let formBody = (
        <div>
            {step === STEPS.COUNTRY &&
                <LocationForm
                    register={register}
                    control={control}
                    country={country}
                    errors={errors}
                />
            }
            {step === STEPS.DESCRIPTION &&
                <DescriptionForm
                    lowestPrice={lowestPrice}
                    highestPrice={highestPrice}
                    register={register}
                    errors={errors}
                />
            }
            {step === STEPS.IMAGES &&
                <ImageForm
                    values={images.map(image => image.imgUrl)}
                    onChange={(imgUrl) => setValue("images", [...getValues("images"), { imgUrl }])}
                    onRemove={(imgUrl) => setValue("images", [...getValues("images").filter(current => current.imgUrl !== imgUrl)])}
                    errors={errors}
                />
            }
            {step === STEPS.HASHTAGS &&
                <HashTagsForm
                    hashtags={hashtags}
                    values={hashTags}
                    onChange={(value) => setValue("hashTags", [...getValues("hashTags"), {
                        name: value.name,
                        isPublic: value.isPublic
                    }])}
                    onRemove={(value) => setValue("hashTags", [...getValues("hashTags").filter(v => v.name !== value)])}
                    onSwitch={(value) => setValue("hashTags", [...getValues("hashTags").filter(v => v.name !== value.name), {
                        name: value.name,
                        isPublic: value.isPublic
                    }])}
                />
            }
            {step === STEPS.CONFIRM &&
                <ConfirmPage values={getValues()} />
            }
        </div>
    )

    return (
        <Modal
            modalId="food-form"
            title="Create your Food Map"
            description="share your favorite food with everyone."
            disabled={loading}
            isOpen={modal.isOpen}
            close={onClose}
            form={formBody}
            actionLabel={actionLabel}
            onSubmit={onNext}
            secondaryAction={step === STEPS.COUNTRY ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
        />
    );
}

export default FormModal;