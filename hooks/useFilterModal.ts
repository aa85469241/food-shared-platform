import { create } from 'zustand';

type useFilterModalProps = {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useFilterModal = create<useFilterModalProps>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}))