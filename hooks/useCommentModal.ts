import { create } from "zustand";

type useCommentModalProps = {
    isOpen: boolean
    open: () => void
    close: () => void
}

type useRatingProps = {
    rate: number
    setRating: (value: number) => void
}

export const useCommentModal = create<useCommentModalProps>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}))

export const useRating = create<useRatingProps>((set) => ({
    rate: 0,
    setRating: (value) => set({ rate: value })
}))