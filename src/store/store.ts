// アプリ全体で共有する状態を管理

import { Document, UpdateFunction, state } from "@/types/types";
import { create } from "zustand";

export const useStore = create<state>((set) => ({

    showSidebar: false,
    flipShowSidebar: () => {
        set((state) => ({ showSidebar: !state.showSidebar }));
    },

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
    
    isLoading: false,
    setIsLoading: (state: boolean) => {
        set({ isLoading: state })
    },

    // 音声
    isPlaying: false,
    setIsPlaying: (state: boolean) => {
        set({ isPlaying: state })
    },

    readingNumber: -1,
    setReadingNumber: (value: number | UpdateFunction) => {
        set(({ readingNumber }) => ({
            readingNumber: typeof value === 'function' ? value(readingNumber) : value
        }));
    },
}))
