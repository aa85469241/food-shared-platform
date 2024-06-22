import { create } from "zustand";

type SettingModalProps = {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useSettingModal = create<SettingModalProps>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))