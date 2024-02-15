// アプリ全体で共有する状態を管理

import { state } from "@/types/state";
import { Document, SelectedMode } from "@/types/types";
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
    document: null,
    setDocument: (document: Document) => {
        set({ document: document })
    },

    username: '',
    setUsername: (username: string) => {
        set({ username: username })
    },

    documents: [],
    setDocuments: (documents: Document[]) => {
        set({ documents: documents })
    },

    selectedmode: { selectedMode: 'preview' },
    setSelectedMode: (seleltedmode: SelectedMode) => {
        set({ selectedmode: seleltedmode })
    }
}))