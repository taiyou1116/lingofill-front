import { state } from "@/types/state";
import { create } from "zustand";

export const useStore = create<state>((set, get) => ({
    // サイドバー
    showSidebar: false,
    flipShowSidebar: () => {
        set((state) => ({ showSidebar: !state.showSidebar }));
    },

    // CenterModal
    showCenterModal: false,
    flipCenterModal: () => {
        set((state) => ({ showCenterModal: !state.showCenterModal }));
    },
    selectedWordIndex: null,
    setSelectedWordIndex: (index: number) => {
        set((state) => ({ selectedWordIndex: index }))
    }
}))