import { state } from "@/types/state";
import { create } from "zustand";

export const useStore = create<state>((set, get) => ({
    showSidebar: true,

    onShowSidebar: () => {
        console.log("ss");
        set({showSidebar: true})
    },
}))