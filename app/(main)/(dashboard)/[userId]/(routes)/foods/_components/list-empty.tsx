'use client';

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";


const EmptyList = () => {
    const modal = useModal();

    return (
        <div className="w-full space-y-4 font-medium tracking-wide">
            <p>You {"haven't"} shared anything yet.</p>
            <p>Start to <Button
                size="sm"
                className="mx-2"
                onClick={modal.open}
            > share your food map</Button> with others.</p>
        </div>
    );
}

export default EmptyList;