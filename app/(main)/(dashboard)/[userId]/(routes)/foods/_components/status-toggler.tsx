import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type StatusTogglerProps = {
    mapId: string
    isPublic: boolean
}

const StatusToggler = ({
    mapId,
    isPublic,
}: StatusTogglerProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onTogglePublicState = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        try {
            startTransition(async () => {
                await axios.patch(`/api/maps/${mapId}/update-map`, {
                    isPublic: !isPublic
                });
                toast({
                    title: "Successfully toggle the state."
                })
                router.refresh();
            })
        }
        catch (err) {
            toast({
                title: "Failed to toggle state.",
                description: `${err}`
            })
        }
    }

    return (
        <button
            className={cn("w-fit flex items-center space-x-2 border px-2 rounded-xl cursor-pointer hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none",
                isPublic ? "border-success" : "border-destructive"
            )}
            disabled={isPending}
            onClick={onTogglePublicState}
        >
            <span className={cn("w-2 h-2 rounded-full",
                isPublic ? "bg-success" : "bg-destructive"
            )}></span>
            <p className={cn("text-sm font-semibold",
                isPublic ? "text-success" : "text-destructive"
            )}>
                {isPublic ? "Public" : "Private"}
            </p>
        </button>
    );
}

export default StatusToggler;