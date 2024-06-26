'use client';

import { useEffect, useState } from "react"

export const useCountDown = (
    isOpen: boolean,
    initialTimer: number,
    intervel = 1000
) => {
    const [timer, setTimer] = useState(initialTimer);
    const [timeout, setTimeout] = useState(true);

    useEffect(() => {
        if (!isOpen) {
            setTimer(initialTimer);
            setTimeout(true);
        }

        if (isOpen) {
            const countdown = setInterval(() => {
                if (timer > 0) setTimer((prev) => prev - 1);
            }, intervel);

            if (timer === 0) setTimeout(false);

            return () => clearInterval(countdown);
        }
    }, [isOpen, initialTimer, timer, intervel]);

    return { timer, timeout }
}