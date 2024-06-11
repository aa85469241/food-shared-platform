import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

type TooltipButtonProps = {
    content: string
    children: React.ReactNode
}

const TooltipButton = ({
    content,
    children
}: TooltipButtonProps) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipButton;