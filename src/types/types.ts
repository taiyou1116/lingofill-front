
export type Document = {
    sortKey: string,
    title: string,
    text: string,
    isSynced: boolean,
    isNew: boolean,
    isDelete: boolean,
    translations: TranslationObj[],
};


// 元の単語のindexと翻訳
export type TranslationObj = {
    indexes: number[],
    translatedText: string,
    memo: string,
};

// モード
export type SelectedMode = 'preview' | 'edit' | 'input';

// アプリ全体で共有する状態の型
export type state = {
    showSidebar: boolean,
    flipShowSidebar: () => void,

    showCenterModal: boolean,
    flipCenterModal: () => void,

    username: string,
    setUsername: (username: string) => void,

    documents: Document[],
    setDocuments: (documents: Document[]) => void,

    // 選択中のドキュメント
    document: Document | null,
    setDocument: (document: Document) => void,

    selectedWordsIndexes: number[],
    setSelectedWordsIndexes: (selectedWordsIndexes: number[]) => void,

    // 選択中のモード
    selectedmode: SelectedMode,
    setSelectedMode: (select: SelectedMode) => void,

    // サーバーからの取得状態
    isLoading: boolean,
    setIsLoading: (state: boolean) => void,

    theme: string,
    setTheme: (theme: string) => void,
}