import { Save } from '@mui/icons-material'
import React from 'react'
import { handleCloseModal } from '@/utils/modal';
import { Document } from '@/types/types';
import { useStore } from '@/store/store';
import { useTranslation } from 'react-i18next';

type Props = {
  selectedWordsIndexes: number[],
  userInputTranslation: string,
  userInputMemo: string,
  document: Document | null,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
}

function SaveButton(props: Props) {
  const { selectedWordsIndexes, userInputTranslation, userInputMemo, document, setDocument, documents, setDocuments } = props;
  const { t } = useTranslation();
  const {flipCenterModal} = useStore((store) => ({
    flipCenterModal: store.flipCenterModal,
  }));

  const handleSaveButton = () => {
    handleTranslation(selectedWordsIndexes, userInputTranslation, userInputMemo);
    handleCloseModal(flipCenterModal);
  }

  const handleTranslation = (selectedWordIndexes: number[], userInput: string, userInputMemo: string) => {
    if (!document) return;
    // translationsのコピーを作成（不変性を保持）
    let updatedTranslations = [...(document.translations ?? [])];

    // 選択された単語のインデックスに基づく既存の翻訳を検索
    const existingTranslationIndex = updatedTranslations.findIndex(translation =>
      selectedWordIndexes.some(index => translation.indexes.includes(index))
    );

    if (existingTranslationIndex !== -1) {
      // 既存の翻訳を更新
      updatedTranslations[existingTranslationIndex] = {
        ...updatedTranslations[existingTranslationIndex],
        translatedText: userInput,
        memo: userInputMemo,
      };
    } else {
      // 新しい翻訳を追加
      updatedTranslations.push({
        indexes: selectedWordIndexes,
        translatedText: userInput,
        memo: userInputMemo,
      });
    }

    // 更新されたドキュメントオブジェクトを作成
    const updatedDocument: Document = {
      ...document,
      translations: updatedTranslations,
      isSynced: false,
    };

    // documents 配列を更新
    const updatedDocuments = documents.map(doc =>
      doc.sortKey === document.sortKey ? updatedDocument : doc
    );

    setDocuments(updatedDocuments);
    setDocument(updatedDocument);
  };

  return (
    <button 
      className='px-4 py-1 md:px-4 md:py-2 bg-gray-800 text-gray-200 rounded-md dark:bg-white dark:text-black'
      onClick={handleSaveButton}
    >
      <div className=' flex gap-1 items-center'><Save />{t('document.modal.saveButton.save')}</div>
    </button>
  )
}

export default React.memo(SaveButton);