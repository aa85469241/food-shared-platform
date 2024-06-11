import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type RatingStarProps = {
    rate: number
}

const RatingStar = ({ rate }: RatingStarProps) => {
    return (
        <div className="flex items-center space-x-2">
            {[...Array(rate)].map((_, index) => {
                const currentRating = index + 1

                return (
                    <div key={index} className="relative">
                        <Input
                            type="radio"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            value={rate}
                        />
                        <Star
                            size={15}
                            className={cn("stroke-1 fill-primary/90",
                                currentRating <= rate
                                && "fill-yellow-500"
                            )}
                        />
                    </div>
                )
            })}
        </div>
    );
}

export default RatingStar;