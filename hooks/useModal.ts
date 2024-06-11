import { create } from "zustand";

type useModalProps = {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useModal = create<useModalProps>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))