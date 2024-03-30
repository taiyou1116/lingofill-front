
export type Document = {
    sortKey: string,
    title: string,
    text: string,
    isSynced: boolean,
    isNew: boolean,
    isDelete: boolean,
    translations: TranslationObj[],
    language: string,
    translateLanguage: string,
    updatedAt: string,
};


// 元の単語のindexと翻訳
export type TranslationObj = {
    indexes: number[],
    memo: string,
};

// モード
export type SelectedMode = 'edit' | 'input';

// アプリ全体で共有する状態の型
export type state = {
    showSidebar: boolean,
    flipShowSidebar: () => void,

    username: string,
    setUsername: (username: string) => void,

    documents: Document[],
    setDocuments: (documents: Document[]) => void,

    // 選択中のドキュメント
    document: Document | null,
    setDocument: (document: Document | null) => void,
}

export type LanguageVoiceMap = {
    [languageCode: string]: string[];
}

export type DocumentState = {
    document: Document | null;
    setDocument: (document: Document) => void;
};

// useStateの型を汎用的にする
export type UseStateGeneric<T> = {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
};
