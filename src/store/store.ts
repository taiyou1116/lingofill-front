
import { create } from "zustand";
import { Document, state } from "@/types/types";

export const useStore = create<state>((set) => ({

    username: '',
    setUsername: (username: string) => {
        set({ username: username })
    },

    showSidebar: false,
    flipShowSidebar: () => {
        set((state) => ({ showSidebar: !state.showSidebar }));
    },
    
    document: null,
    setDocument: (document: Document | null) => {
        set({ document: document })
    },

    documents: [],
    setDocuments: (documents: Document[]) => {
        set({ documents: documents })
    },
}))
