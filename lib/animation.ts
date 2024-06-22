
export const screenFadeIn = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.85, ease: "easeInOut" }
}

export const cardFadeInOut = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 30, opacity: 0 },
    transition: { duration: 0.85, ease: "easeInOut" }
}

export const favoriteVariants = {
    like: {
        scale: [1, 1.3, 1],
        rotate: ["0deg", "-30deg", "0deg"],
        transition: {
            duration: 0.5
        }
    },
    dislike: {
        scale: [1, 1.3, 1],
        rotate: ["0deg", "-30deg", "0deg"],
        transition: {
            duration: 0.5
        }
    }
}

export const floatMenuVariants = {
    init: {
        y: 10,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20
        }
    },
    expand: {
        x: 0,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
        }
    }
}

export const clipPathVariants = {
    open: {
        width: "100%",
        height: "100%",
        clipPath: "circle(110% at 100% 100%)",
    },
    closed: {
        width: "50%",
        height: "30%",
        clipPath: "polygon(100% 10%, 0% 100%, 100% 100%)",
    }
}

export const innerClipPathVariants = {
    open: {
        width: "100%",
        height: "100%",
        clipPath: "circle(110% at 100% 100%)",
    },
    closed: {
        width: "100%",
        height: "100%",
        clipPath: "polygon(100% 12%, 2% 100%, 100% 100%)",
    }
}

export const textMoveUp = {
    open: (custom: number) => ({
        y: 0,
        transition: {
            duration: 0.5,
            delay: 0.35 * custom
        }
    }),
    closed: {
        y: "100%",
        transition: {
            duration: 0.5,
        }
    }
}