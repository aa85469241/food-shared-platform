'use client';

import * as z from "zod";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/actions/auth/resetPassword";
import { CheckCircle, XCircle } from "lucide-react";

export type ResetSchemaValues = z.infer<typeof ResetSchema>

const ForgotPassword = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<ResetSchemaValues>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            username: "",
            email: "",
        }
    })

    const onSubmit = (values: ResetSchemaValues) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            resetPassword(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        })
    }

    return (
        <Card className="w-96">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">
                    Forgot Your Password?
                </CardTitle>
                <CardDescription>
                    You will receive an email to reset your password.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <Form {...form}>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="font-semibold text-sm">
                                        Username*:
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage className="ml-1 font-semibold" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="font-semibold text-sm">
                                        Email*:
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                    Send reset email
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

export default ForgotPassword;