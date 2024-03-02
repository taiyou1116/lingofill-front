// アプリ全体で共有する状態を管理

import { state } from "@/types/types";
import { Document, SelectedMode } from "@/types/types";
import { create } from "zustand";

export const useStore = create<state>((set) => ({
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
    // null追加した
    document: null,
    setDocument: (document: Document | null) => {
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

    selectedWordsIndexes: [],
    setSelectedWordsIndexes: (selectedWordsIndexes: number[]) => {
        set({ selectedWordsIndexes: selectedWordsIndexes})
    },

    selectedmode: 'input',
    setSelectedMode: (seleltedmode: SelectedMode) => {
        set({ selectedmode: seleltedmode })
    },

    // CenterModal
    isLoading: false,
    setIsLoading: (state: boolean) => {
        set({ isLoading: state })
    },
}))