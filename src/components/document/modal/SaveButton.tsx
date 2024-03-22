
import React from 'react'
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';
import { handleCloseModal } from '@/utils/modal';
import { Document } from '@/types/types';
import { Save } from '@mui/icons-material'
import { leaveTranslation } from '@/utils/helper';


type Props = {
  selectedWordsIndexes: number[],
  userInputTranslation: string,
  userInputMemo: string,
  document: Document | null,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  selectedWords: string,
}

function SaveButton(props: Props) {
  const { selectedWordsIndexes, userInputTranslation, userInputMemo, document, setDocument, documents, setDocuments, selectedWords } = props;
  const { flipCenterModal } = GrobalStore();
  const { t } = useTranslation();

  const handleSaveButton = () => {
    handleTranslation(selectedWordsIndexes, userInputTranslation, userInputMemo);
    handleCloseModal(flipCenterModal);
  }

  const handleTranslation = (selectedWordsIndexes: number[], userInput: string, userInputMemo: string) => {
    if (!document) return;

    const newDocument = leaveTranslation(document, selectedWordsIndexes);

    // 選択された単語のインデックスに基づく既存の翻訳を検索
    const existingTranslationIndex = newDocument.translations.findIndex(translation =>
      selectedWordsIndexes.some(index => translation.indexes.includes(index))
    );

    if (userInput === '') {
      userInput = selectedWords;
    }

    if (existingTranslationIndex !== -1) {
      // 既存の翻訳を更新
      newDocument.translations[existingTranslationIndex] = {
        ...newDocument.translations[existingTranslationIndex],
        translatedText: userInput,
        memo: userInputMemo,
      };
    } else {
      // 新しい翻訳を追加
      newDocument.translations.push({
        indexes: selectedWordsIndexes,
        translatedText: userInput,
        memo: userInputMemo,
      });
    }

    // 更新されたドキュメントオブジェクトを作成
    const updatedDocument: Document = {
      ...document,
      translations: newDocument.translations,
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
      className='px-4 py-1 md:px-4 md:py-2 rounded-md
               bg-lime-500
               text-gray-200
               hover:bg-lime-800'
      onClick={handleSaveButton}
    >
      <div className=' flex gap-1 items-center'><Save />{t('document.modal.saveButton.save')}</div>
    </button>
  )
}

export default React.memo(SaveButton);