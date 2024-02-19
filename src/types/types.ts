// センテンスは題名と本文を含む
export type Document = {
    sortKey: string,
    title: string;
    text: string;
    isSynced: boolean;
};


// 翻訳された状態
export type TranslationObj = {
    indexes: number[];
    translatedText: string;
};

// モード
export type SelectedMode = 'preview' | 'edit' | 'input';

// アプリ全体で共有する状態の型
export type state = {
    // サイドバー
    showSidebar: boolean,
    flipShowSidebar: () => void,

    // CenterModal
    showCenterModal: boolean,
    flipCenterModal: () => void,

    // user情報
    username: string,
    setUsername: (username: string) => void,

    // 全てのドキュメント
    documents: Document[],
    setDocuments: (documents: Document[]) => void,

    // 選択中のドキュメント
    document: Document | null,
    setDocument: (document: Document) => void,

    // 選択中のモード
    selectedmode: SelectedMode,
    setSelectedMode: (select: SelectedMode) => void,
}