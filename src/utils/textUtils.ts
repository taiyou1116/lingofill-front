
import { Document } from "@/types/types";

/**スペースのある言語でtrueを返す @param ln 言語 */
export function judgeSpaceLanguage(ln: string | undefined) {
  if (ln === 'ja' || ln === 'zh') {
    return false;
  } else {
    return true;
  }
}

/**string[]を一つのテキストにして返す @param ln 言語 @param nums インデックス配列 @params 全体の単語 */
export function returnTextFromLn(ln: string | undefined, nums: number[], words: string[]) {
  if (judgeSpaceLanguage(ln)) {
    return nums.map((i) => words[i]).join(' ');
  } else {
    return nums.map((i) => words[i]).join('');
  }
}

/**テキストを文ごとにスライス @param text テキスト @param ln 言語 */
export function splitTextToSegments(text: string, ln: string | undefined) {
  if (judgeSpaceLanguage(ln)) {
    return text.split(/(?<=[.?!])\s+/);
  } else {
    return text.split(/(?<=[。!?])/);
  } 
}

/**表示したい文字数を指定 @param text 表示テキスト @param maxLength 指定の長さ */
export function truncateText(text: string | undefined, maxLength: number) {
  if (text && text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

/**言語によってスプリットを変える @param ln 言語 */
function filterLanguage(ln: string) {
  if (judgeSpaceLanguage(ln)) {
    return /[^.!?]*[.!?]*/g;
  } else {
    return /[^。!?]*[。!?]*/g;
  }
}

/**スペースのある言語か判別する @param text テキスト @param ln 言語 */
export function splitTextToSegment(text: string, ln: string): string[] {
  return text.split('\n').reduce((acc, line, index, array) => {

    // 文の終わり（. ? !）で分割し、空ではない結果だけをフィルターする
    const sentences = line.match(filterLanguage(ln))?.map(sentence => sentence.trim()).filter(sentence => sentence.length) || [];

    // 文ごとに結果に追加
    acc.push(...sentences);

    // 最後の行以外には改行を追加
    if (index < array.length - 1) {
      acc.push('\n');
    }

    return acc;
  }, [] as string[]);
}

/**選択したTranslationを削除 @param document 現在のドキュメント @param selectedWordsIndexes 選択した単語のインデックス */
export function leaveTranslation(document: Document, selectedWordsIndexes: number[]) {
  // 選択された単語、熟語以外のtranslation
  const leaveTranslations = document.translations.filter(
    (translation) => (!selectedWordsIndexes.includes(translation.indexes[0])));

  // document, documentsも更新
  const newDocument = {
    ...document,
    translations: leaveTranslations,
    isSynced: false,
  };

  return newDocument;
}