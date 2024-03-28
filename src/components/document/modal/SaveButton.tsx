
import React from 'react'
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';

import { leaveTranslation } from '@/utils/textUtils';
import Button from '@/components/ui/Button';

import { Save } from '@mui/icons-material'
import { Document, TranslationObj } from '@/types/types';

type Props = {
  userInputMemo: string,
}

const SaveButton: React.FC<Props> = ({ userInputMemo }) => {
  const { t } = useTranslation();
  const { selectedWordsIndexes, flipCenterModal, document, documents, setDocument, setDocuments } = GrobalStore();

  const updateTranslation = (translations: TranslationObj[], selectedWordsIndexes: number[], userInputMemo: string) => {
    const existingTranslationIndex = translations.findIndex(translation =>
      selectedWordsIndexes.some(index => translation.indexes.includes(index))
    );
  
    if (existingTranslationIndex !== -1) {
      // 既存の翻訳を更新
      translations[existingTranslationIndex] = {
        ...translations[existingTranslationIndex],
        memo: userInputMemo,
      };
    } else {
      // 新しい翻訳を追加
      translations.push({
        indexes: selectedWordsIndexes,
        memo: userInputMemo,
      });
    }
  
    return translations;
  };
  
  const updateDocuments = (documents: Document[], updatedDocument: Document) => {
    return documents.map(doc =>
      doc.sortKey === updatedDocument.sortKey ? updatedDocument : doc
    );
  };
  
  const handleTranslation = (selectedWordsIndexes: number[], userInputMemo: string) => {
    if (!document) return;
  
    const newDocument = leaveTranslation(document, selectedWordsIndexes);
  
    // 選択された単語の翻訳を更新
    const updatedTranslations = updateTranslation(newDocument.translations, selectedWordsIndexes, userInputMemo);
  
    // 更新されたドキュメントオブジェクトを作成
    const updatedDocument: Document = {
      ...document,
      translations: updatedTranslations,
      isSynced: false,
    };
  
    // documents 配列を更新
    const updatedDocuments = updateDocuments(documents, updatedDocument);
  
    setDocuments(updatedDocuments);
    setDocument(updatedDocument);

    flipCenterModal();
  };

  return (
    <Button
      onClick={() => handleTranslation(selectedWordsIndexes, userInputMemo)}
      baseUI='flex items-center rounded-md gap-1 text-sm px-2 py-1 md:px-4 md:py-2 md:text-base '
      light='bg-lime-500 text-gray-200 hover:bg-lime-800'
      dark='bg-lime-500 text-gray-200 hover:bg-lime-800'
    >
      <Save />{t('document.modal.saveButton.save')}
    </Button>
  )
}

export default React.memo(SaveButton);