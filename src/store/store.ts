import { state } from "@/types/state";
import { create } from "zustand";

export const useStore = create<state>((set, get) => ({
    showSidebar: false,

    onShowSidebar: () => {
        set({showSidebar: true})
    },
}))