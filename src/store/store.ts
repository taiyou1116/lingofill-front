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

    // 選択されているtext
    text: '',
    setText: (text: string) => {
        set({ text: text })
    },

    username: '',
    setUsername: (username: string) => {
        set({ username: username })
    },
}))