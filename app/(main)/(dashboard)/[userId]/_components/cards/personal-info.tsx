'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfoSchema } from "@/lib/schema";
import axios from "axios";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AlertCircle, CalendarIcon, PencilLine } from "lucide-react";
import { TProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import SelfieUploader from "../selfie-uploader";
import { useRouter } from "next/navigation";
import Calendar from "@/components/Calendar";

type PersonalInfoValues = z.infer<typeof PersonalInfoSchema>;

type PersonalInfoProps = {
    data: TProfile
}

const PersonalInfo = ({
    data
}: PersonalInfoProps) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const form = useForm<PersonalInfoValues>({
        resolver: zodResolver(PersonalInfoSchema),
        defaultValues: {
            firstName: data.firstName,
            lastName: data.lastName,
            birth: new Date(data.birth as string),
        }
    })

    const onSubmit = async (values: PersonalInfoValues) => {
        try {
            await axios.patch(`/api/auth/${data.userId}`, values)
            toast({
                title: "Update Personal Information Successfully."
            })
            router.refresh();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setEdit(false);
        }
    }

    const handleOnEdit = () => {
        if (!edit) {
            setEdit(true);
        } else {
            form.reset();
            setEdit(false);
        }
    }

    if (!mounted) {
        return null;
    }

    return (
        <Card className="xl:col-span-7 relative w-full h-fit max-h-80">
            <SelfieUploader
                className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 z-20"
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
                {(!data.firstName || !data.lastName || !data.birth)
                    &&
                    <div className="w-layout-hflex space-x-2 bg-destructive/50 rounded-full p-1 px-2">
                        <AlertCircle className="text-primary" />
                        <p className="text-primary font-semibold text-sm">
                            Some of your personal info {"haven't"} been completed yet.
                        </p>
                    </div>
                }
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <div className="w-full flex items-center gap-x-2">
                        <FormField
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">FirstName:</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="max-w-xs"
                                            disabled={!edit}
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
                                            disabled={!edit}
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
                                            disabled={!edit}
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
                </Form>
            </CardContent>
            <CardFooter className="justify-end space-x-4">
                <Button
                    size="icon"
                    variant="ghost"
                    className="font-semibold cursor-pointer rounded-full hover:underline"
                    onClick={handleOnEdit}
                >
                    {edit ? "Cancel" : <PencilLine className="drop-shadow" />}
                </Button>
                <Button
                    size="sm"
                    type="submit"
                    disabled={!edit}
                    className="font-bold tracking-wider"
                    onClick={form.handleSubmit(onSubmit)}
                >
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
}

export default PersonalInfo;