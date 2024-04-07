
import { Document } from "@/types/types";
import { returnTextFromLn } from "./textUtils";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";


// 単語編集処理
export const handleClick = (
  showCenterModal: boolean,
  isSelectedReading: boolean,
  index: number,
  localDocument: Document | null,
  words: string[],
  setSelectedWordsIndexes: Function,
  setSelectedWords: Function,
  handleOpen: Function,
) => {
  if (showCenterModal || isSelectedReading) return;

  const translation = localDocument!.translations.find(translation => translation.indexes.includes(index));
  if (translation) {
    setSelectedWordsIndexes(translation.indexes);
    setSelectedWords(returnTextFromLn(localDocument?.language, translation.indexes, words));
  } else {
    setSelectedWordsIndexes([index]);
    setSelectedWords(words[index]);
  }
  handleOpen();
};

export const handleMouseDown = (
  showCenterModal: boolean,
  isSelectedReading: boolean,
  setIsDragging: Function,
  setSelectedWordsIndexes: Function,
) => {
  if (showCenterModal || isSelectedReading) return;

  setIsDragging(true);
  setSelectedWordsIndexes([]);
};

export const handleMouseMove = (
  {
  showCenterModal,
  isDragging,
  index,
  localDocument,
  setSelectedWordsIndexes,
  startDragIndex,
  setStartDragIndex,
  oldIndex,
  setOldIndex,
}: {
  showCenterModal: boolean,
  isDragging: boolean,
  index: number,
  localDocument: Document | null,
  setSelectedWordsIndexes: Function,
  startDragIndex: number | null,
  setStartDragIndex: Function,
  oldIndex: number | null,
  setOldIndex: Function,
}
) => {
  if (showCenterModal || !isDragging) return;

  if (startDragIndex === null) {
    // ドラッグ開始時にtranslation.indexesにindexが含まれているかチェック
    const startTranslation = localDocument!.translations.find(t => t.indexes.includes(index));
    if (startTranslation) {
      // 含まれている場合はそのindexes全体を選択
      setSelectedWordsIndexes(startTranslation.indexes);
      setStartDragIndex(index);
      setOldIndex(index);
    } else {
      setStartDragIndex(index);
    }
  } else {
    if (oldIndex === index) return;

    setOldIndex(index);
    const newIndexes: number[] = [];
    const minIndex = Math.min(startDragIndex, index);
    const maxIndex = Math.max(startDragIndex, index);

    for (let i = minIndex; i <= maxIndex; i++) {
      // translation.indexes[0]のみではなく、indexes全体に含まれるかチェック
      const translation = localDocument!.translations.find(t => t.indexes.includes(i));
      if (translation) {
        // 同じindexesを複数回追加しないようにチェック
        translation.indexes.forEach(index => {
          if (!newIndexes.includes(index)) {
            newIndexes.push(index);
          }
        });
      } else {
        if (!newIndexes.includes(i)) {
          newIndexes.push(i);
        }
      }
    }
    setSelectedWordsIndexes(newIndexes);
  }
};

export const handleMouseUp = (
  showCenterModal: boolean,
  setIsDragging: Function,
  setStartDragIndex: Function,
  selectedWordsIndexes: number[],
  handleOpen: Function,
  localDocument: Document | null,
  words: string[],
  setSelectedWords: Function,
) => {
  if (showCenterModal) return;

  setIsDragging(false);
  setStartDragIndex(null);

  if (selectedWordsIndexes.length > 0) {
    handleOpen();
    setSelectedWords(returnTextFromLn(localDocument?.language, selectedWordsIndexes, words));
  }
};

export const handleTouchStart = (
  index: number,
  setSelectedWordsIndexes: Function,
  touchIndexRef: React.MutableRefObject<number | null>,
  timerId: NodeJS.Timeout | null,
  showCenterModal: boolean,
  isSelectedReading: boolean,
  setIsDragging: Function,
  setStartDragIndex: Function,
  setTimerId: Function,
  ) => {
  setSelectedWordsIndexes([]);
  touchIndexRef.current = index;
  // 以前のタイマーがあればクリア
  if (timerId) clearTimeout(timerId);

  // 0.5秒後に実行されるタイマーを設定
  const newTimerId = setTimeout(() => {      
    if (index === touchIndexRef.current) {

      disableBodyScroll(document.body);

      handleMouseDown(showCenterModal, isSelectedReading, setIsDragging, setSelectedWordsIndexes);
      setStartDragIndex(index);
      setSelectedWordsIndexes([index]);
    }
  }, 500);
  setTimerId(newTimerId);
};

export const handleTouchMove = (
  e: React.TouchEvent<HTMLSpanElement>,
  touchIndexRef: React.MutableRefObject<number | null>,
  startDragIndex: number | null,
  setStartDragIndex: Function,
  oldIndex: number | null,
  setOldIndex: Function,
  showCenterModal: boolean,
  isDragging: boolean,
  localDocument: Document | null,
  setSelectedWordsIndexes: Function,
) => {
  // タッチイベントのクライアント座標を取得
  const touchX = e.touches[0].clientX;
  const touchY = e.touches[0].clientY;

  // タッチポイントにある要素を取得
  const elementUnderTouch = document.elementFromPoint(touchX, touchY) as HTMLSpanElement;

  // 要素からindexを取得（要素が正しく取得でき、data-index属性を持っている場合）
  if (elementUnderTouch && elementUnderTouch.hasAttribute('data-index')) {
    const newIndex = parseInt(elementUnderTouch.getAttribute('data-index')!, 10);

    if (newIndex === startDragIndex) {
      touchIndexRef.current = newIndex;
      handleMouseMove({
        showCenterModal, 
        isDragging, 
        index: newIndex, 
        localDocument, 
        setSelectedWordsIndexes, 
        startDragIndex, 
        setStartDragIndex, 
        oldIndex, 
        setOldIndex
      });
    }
    if (newIndex === touchIndexRef.current) return;
      touchIndexRef.current = newIndex;
      handleMouseMove({
        showCenterModal, 
        isDragging, 
        index: newIndex, 
        localDocument, 
        setSelectedWordsIndexes, 
        startDragIndex, 
        setStartDragIndex, 
        oldIndex, 
        setOldIndex
      });
    }
};

export const handleTouchEnd = (
  touchIndexRef: React.MutableRefObject<number | null>,
  showCenterModal: boolean,
  setIsDragging: Function,
  setStartDragIndex: Function,
  selectedWordsIndexes: number[],
  handleOpen: Function,
  localDocument: Document | null,
  words: string[],
  setSelectedWords: Function,
  timerId: NodeJS.Timeout | null,
  setTimerId: Function,
) => {
  touchIndexRef.current = null;
  handleMouseUp(
    showCenterModal, 
    setIsDragging, 
    setStartDragIndex, 
    selectedWordsIndexes, 
    handleOpen, 
    localDocument, 
    words, 
    setSelectedWords,
  );

  enableBodyScroll(document.body);

  if (timerId) {
    clearTimeout(timerId);
    setTimerId(null);
  }
};
