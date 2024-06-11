import { cn } from "@/lib/utils";

type TipLabelProps = {
    label: string
    className?: string
}

const TipLabel = ({ label, className }: TipLabelProps) => {
    return (
        <div className={cn("absolute bg-primary/80 rounded-lg rounded-tl-none shadow border", className)}>
            <div className="relative w-full py-1 px-3">
                <p className="text-sm font-bold text-white">{label}</p>
            </div>
        </div>
    );
}

export default TipLabel;