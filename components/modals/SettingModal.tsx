'use client';

import axios from "axios";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PersonalInfoSchema } from "@/lib/schema";
import { useSettingModal } from "@/hooks/useSettingModal";
import Modal from "./Modal";
import Calendar from "../Calendar";
import SelfieUploader from "@/app/(main)/(dashboard)/[userId]/_components/selfie-uploader";
import { TProfile } from "@/types";
import { CalendarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../ui/popover";
import { Textarea } from "../ui/textarea";

type PersonalInfoValues = z.infer<typeof PersonalInfoSchema>;

type SettingModalProps = {
    data: TProfile
}

const SettingModal = ({ data }: SettingModalProps) => {
    const router = useRouter();
    const settingModal = useSettingModal();
    const [isPending, startTransition] = useTransition();

    const form = useForm<PersonalInfoValues>({
        resolver: zodResolver(PersonalInfoSchema),
        mode: "onChange",
    })

    useEffect(() => {
        if (data) {
            form.reset({
                firstName: data.firstName,
                lastName: data.lastName ,
                birth: new Date(data.birth as string),
                description: data.description
            });
        }
    }, [form, data])

    const onSubmit = async (values: PersonalInfoValues) => {
        try {
            startTransition(async () => {
                await axios.patch(`/api/auth/${data.userId}`, values)
                toast({
                    title: "Update Personal Information Successfully."
                })
                router.refresh();
                onClose();
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    const onClose = () => {
        form.reset();
        settingModal.close();
    }

    let formBody = (
        <Card className="relative w-full h-fit mt-2">
            <SelfieUploader
                className="absolute top-0 right-0 translate-x-1 -translate-y-2 z-20"
                selfie={data.imageUrl}
            />
            <CardHeader className="pt-3">
                <CardTitle className="flex flex-col gap-x-1 text-xl tracking-wide">
                    {(data.firstName || data.lastName)
                        ? (data.firstName! + " " + data.lastName!)
                        : "Guest"}
                    <div className="text-sm text-primary/70 tracking-wider">
                        (ID: {data.name})
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <div className="w-full flex items-center gap-x-2">
                        <FormField
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        FirstName:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="max-w-xs"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">LastName:</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="max-w-xs"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="birth"
                        render={({ field }) => (
                            <FormItem className="flex flex-col space-y-3">
                                <FormLabel className="font-bold">
                                    Date of birth:
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn("w-[240px] pl-3 text-left font-normal",
                                                data.birth && "bg-white"
                                            )}
                                        >
                                            {(data.birth || field.value)
                                                ? <span>
                                                    {format(field.value, "PPP")}
                                                </span>
                                                : <span>Pick a date</span>
                                            }
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            value={field.value}
                                            onChange={(value) => field.onChange(value)}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="description"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel className="font-bold">
                                    Introduce yourself:
                                </FormLabel>
                                <FormControl>
                                    <Textarea 
                                    placeholder="This guy is too lazy to post."
                                    {...field} 
                                    />
                                </FormControl>
                                <div className={cn("absolute bottom-1 right-4 text-sm font-medium", field.value.length > 300 && "text-destructive")}>
                                    ({field.value.length}/50)
                                </div>
                            </FormItem>
                        )}
                    />
                </Form>
            </CardContent>
        </Card>
    )

    return (
        <Modal
            modalId="personal-info"
            isOpen={settingModal.isOpen}
            close={onClose}
            title={`Welcome, ${data.name}`}
            description="organize your personal data here."
            disabled={isPending}
            onSubmit={form.handleSubmit(onSubmit)}
            actionLabel="Submit"
            form={formBody}
        />
    );
}

export default SettingModal;