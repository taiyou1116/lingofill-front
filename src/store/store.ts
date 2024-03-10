// アプリ全体で共有する状態を管理

import { Document, SelectedMode, UpdateFunction, VoiceRate, VoiceType, state } from "@/types/types";
import { create } from "zustand";

export const useStore = create<state>((set) => ({

    showSidebar: false,
    flipShowSidebar: () => {
        set((state) => ({ showSidebar: !state.showSidebar }));
    },

    showCenterModal: false,
    flipCenterModal: () => {
        set((state) => ({ showCenterModal: !state.showCenterModal }));
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

    selectedmode: 'input',
    setSelectedMode: (seleltedmode: SelectedMode) => {
        set({ selectedmode: seleltedmode })
    },

    
    isLoading: false,
    setIsLoading: (state: boolean) => {
        set({ isLoading: state })
    },


    // setting関連
    language: 'ja',
    setLanguage: (ln: string) => {
        set({ language: ln })
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

    voiceType: 'standard',
    setVoiceType: (voice: VoiceType) => {
        set({ voiceType: voice })
    },

    voiceRate: '100',
    setVoiceRate: (newRate: VoiceRate) => {
        set({ voiceRate: newRate })
    }
}))
