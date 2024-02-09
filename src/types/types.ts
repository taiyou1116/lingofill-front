// センテンスは題名と本文を含む
export type Sentences = {
    title: string;
    text: string;
};


// 翻訳された状態
export type TranslationObj = {
    indexes: number[];
    translatedText: string;
};