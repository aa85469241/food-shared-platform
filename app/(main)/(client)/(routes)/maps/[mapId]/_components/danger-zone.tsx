'use client';

import AlertModal from "@/components/modals/AlertModal";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useClerk } from "@clerk/nextjs";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type DangerZoneProps = {
    userId: string
}

const DangerZone = ({
    userId
}: DangerZoneProps) => {
    const router = useRouter();
    const { signOut } = useClerk();
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const deleteUser = async () => {
        try {
            startTransition(async () => {
                axios.delete(`/api/auth/${userId}/delete-user`)

                signOut().then(() => {
                    router.refresh()
                    router.push("/")
                })

                toast({
                    title: "Hope to see you again."
                })
            })

        }
        catch (err) {
            console.log("Something went wrong!", err)
        }
    }

    return (
        <div className="mt-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <AlertCircle size={25} /> Danger Zone
            </h1>
            <Card className="relative space-y-4 mt-4">
                <CardHeader className="pb-0 pt-4">
                    <CardTitle className="text-lg font-semibold">
                        Permanently delete your account
                    </CardTitle>
                    <CardDescription className="font-medium">
                        Your account will be permanently deleted.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert
                        className="flex items-center gap-2 justify-between"
                        variant={open ? "destructive" : "default"}
                    >
                        <div className="w-layout-hflex gap-x-2">
                            <AlertCircle />
                            <p className="font-semibold">
                                Once you click delete, there is no going back.
                            </p>
                        </div>
                        <Button
                            variant={open ? "destructive" : "default"}
                            className="font-bold"
                            onClick={() => setOpen(true)}
                        >
                            Delete Account
                        </Button>
                    </Alert>
                </CardContent>
            </Card>
            <AlertModal
                open={open}
                onOpenChange={setOpen}
                title="Delete Account"
                description="Are you sure you want to delete your account? This action is irreversible, and you will lose all your data associated with this account."
                disabled={isPending}
                button={
                    <Button
                        variant="destructive"
                        className="font-bold"
                        onClick={deleteUser}
                    >
                        Delete
                    </Button>
                }
            />
        </div>
    );
}

export default DangerZone;