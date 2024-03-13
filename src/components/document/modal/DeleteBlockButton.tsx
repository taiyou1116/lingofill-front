
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Document } from '@/types/types';
import { AutoFixHigh } from '@mui/icons-material';

type Props = {
  document: Document | null,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  selectedWordsIndexes: number[],
}

function DeleteBlockButton(props: Props) {
  const { document, setDocument, documents, setDocuments, selectedWordsIndexes } = props;
  const { t } = useTranslation();
  const deleteBlock = () => {
    if (!document) return;

    // 選択された単語のインデックスを含まない翻訳をフィルタリング
    const updatedTranslations = document.translations.filter(
      (translation) => !translation.indexes.includes(selectedWordsIndexes[0])
    );
    const updatedDocument = {
      ...document,
      translations: updatedTranslations,
      isSynced: false,
    };
    const updatedDocuments = documents.map((doc) =>
      doc.sortKey === document!.sortKey ? updatedDocument : doc
    );
    setDocuments(updatedDocuments);
    setDocument(updatedDocument);
  }

  return (
    <button 
      className=' text-gray-200 rounded-md bg-red-500 hover:bg-red-800 px-4 py-1 md:px-4 md:py-2 w-1/6 '
      onClick={deleteBlock}
    >
      <div className=' flex gap-1 items-center'><AutoFixHigh /> {t('document.modal.deleteBlockButton.cancelBlock')}</div>
    </button>
  )
}

export default React.memo(DeleteBlockButton);