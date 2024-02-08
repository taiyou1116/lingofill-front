// アプリ全体で共有する状態を管理

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
}))