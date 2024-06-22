'use client';

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";


const EmptyList = () => {
    const modal = useModal();

    return (
        <div className="w-full font-medium tracking-wide leading-10">
            <p>You {"haven't"} shared anything yet. Click <Button
                size="sm"
                onClick={modal.open}
            > share your food map</Button> to share with others.</p>

        </div>
    );
}

export default EmptyList;