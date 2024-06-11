
import { ReactElement } from "react"
import { Button } from "../ui/button"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"

type AlertModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    disabled: boolean
    button: ReactElement<HTMLButtonElement>
}

const AlertModal = ({
    open,
    onOpenChange,
    title,
    description,
    disabled,
    button,
}: AlertModalProps) => {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={disabled}>
                        Cancel
                    </AlertDialogCancel>
                    {button}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertModal