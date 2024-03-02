import { Document } from '@/types/types';
import React from 'react'

type Props = {
  document: Document | null,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  selectedWordsIndexes: number[],
}

function DeleteBlockButton(props: Props) {
  const { document, setDocument, documents, setDocuments, selectedWordsIndexes } = props;

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
      className=' text-gray-400 rounded-md '
      onClick={deleteBlock}
    >
      ブロックを取り消す
    </button>
  )
}

export default DeleteBlockButton