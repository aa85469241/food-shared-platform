'use client';

import * as z from "zod";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewPasswordSchema } from "@/lib/schema";
import { useSearchParams } from "next/navigation";
import { setNewPassword } from "@/actions/auth/setNewPassword";
import { CheckCircle, UserCircle, XCircle } from "lucide-react";

export type NewPasswordSchemaValues = z.infer<typeof NewPasswordSchema>

const NewPassword = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const username = searchParams.get('username');
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<NewPasswordSchemaValues>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = (values: NewPasswordSchemaValues) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            setNewPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        })
    }

    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle className="text-xl font-bold">
                    Reset Your Password
                </CardTitle>
                <CardDescription>
                    Change your password
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <Form {...form}>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            disabled={true}
                            className="w-fit py-2 px-3 rounded-full">
                            <div className="w-full flex items-center gap-x-1">
                                <UserCircle />
                                <div className="font-medium">{username}</div>
                            </div>
                        </Button>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="font-semibold text-sm">
                                        New Password*:
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage className="ml-1 font-semibold" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="font-semibold text-sm">
                                        Confirm Password*:
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage className="ml-1 font-semibold" />
                                </FormItem>
                            )}
                        />
                    </div>
                </Form>
                {success && <div className="w-full flex items-center gap-x-2 bg-success/20 mt-4 p-2 rounded-md font-medium text-success">
                    <CheckCircle /> {success}
                </div>}
                {error && <div className="w-full flex items-center gap-x-2 bg-destructive/20 mt-4 p-2 rounded-md font-medium text-destructive">
                    <XCircle /> {error}
                </div>}
            </CardContent>
            <CardFooter className="w-full flex flex-col gap-y-3">
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    onClick={form.handleSubmit(onSubmit)}
                >
                    reset the password
                </Button>
                <div className="text-sm font-semibold">
                    or <Link
                        href="/auth/sign-in"
                        className="font-bold hover:underline hover:underline-offset-1"
                    >back to signIn</Link>
                </div>
            </CardFooter>
        </Card>
    );
}

export default NewPassword;