'use client';

import axios from "axios";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { FoodMapSchema } from "@/lib/schema";
import LocationForm from "../forms/location-form";
import ImageForm from "../forms/image-form";
import DescriptionForm from "../forms/description-form";
import HashTagsForm from "../forms/hashtags-form";
import ConfirmPage from "../forms/confirm-page";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { FoodMap as FoodMapValue } from "@/types";
import { useEditModal } from "@/hooks/useEditModal";

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
        fields: ["title", "description", "priceRange"]
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

type EditFormModalProps = {
    initialValues: FoodMapValue | undefined
}

const EditFormModal = ({ initialValues }: EditFormModalProps) => {
    const editModal = useEditModal();
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
        defaultValues: initialValues
    })

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [reset, initialValues]);

    const country = watch("country")
    const images = watch("images")
    const hashTags = watch("hashTags")
    const lowestPrice = watch("lowestPrice")
    const highestPrice = watch("highestPrice")

    const onSubmit = async (values: FoodMapValues) => {
        try {
            if (initialValues) {
                setLoading(true);
                await axios.patch(`/api/maps/${initialValues.id}`, values);
                toast({
                    title: "Update success!!",
                    description: "Your food map has been updated!"
                })
                router.refresh();
                onClose();
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
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
        editModal.close();
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
            modalId="edit-form"
            title="Edit your Food Map"
            description="change the values of your food map."
            disabled={loading}
            isOpen={editModal.isOpen}
            close={onClose}
            form={formBody}
            actionLabel={actionLabel}
            onSubmit={onNext}
            secondaryAction={step === STEPS.COUNTRY ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
        />
    );
}

export default EditFormModal;