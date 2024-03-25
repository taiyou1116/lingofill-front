
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
export type SelectedMode = 'preview' | 'edit' | 'input';

export type VoiceType = 'neural' | 'standard';
export type VoiceRate = '50' | '60' | '70' | '80' | '90' | '100' | '110' | '120' | '130' | '140' | '150';

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
    setDocument: (document: Document | null) => void,

    selectedWordsIndexes: number[],
    setSelectedWordsIndexes: (selectedWordsIndexes: number[]) => void,

    // 選択中のモード
    selectedmode: SelectedMode,
    setSelectedMode: (select: SelectedMode) => void,

    // サーバーからの取得状態
    isLoading: boolean,
    setIsLoading: (state: boolean) => void,

    language: string,
    setLanguage: (ln: string) => void,

    isPlaying: boolean,
    setIsPlaying: (state: boolean) => void;

    readingNumber: number,
    setReadingNumber: (value: number | ((prevNumber: number) => number)) => void;

    voiceType: VoiceType,
    setVoiceType: (voice: VoiceType) => void,

    voiceRate: VoiceRate,
    setVoiceRate: (newRate: VoiceRate) => void,

    translationExpression: string,
    setTranslationExpression: (translationExpression: string) => void,
}

export type LanguageVoiceMap = {
    [languageCode: string]: string[];
}

export type UpdateFunction = (prevNumber: number) => number;