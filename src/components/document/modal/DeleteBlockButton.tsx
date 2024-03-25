
import React from 'react'
import { useTranslation } from 'react-i18next';
import { GrobalStore } from '@/store/grobalStore';

import { handleCloseModal } from '@/utils/modal';
import { leaveTranslation } from '@/utils/helper';

import { AutoFixHigh } from '@mui/icons-material';
import { Document } from '@/types/types';

type Props = {
  document: Document | null,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  selectedWordsIndexes: number[],
}

function DeleteBlockButton(props: Props) {
  const { document, setDocument, documents, setDocuments, selectedWordsIndexes } = props;
  const { flipCenterModal } = GrobalStore();
  const { t } = useTranslation();

  const deleteBlock = () => {
    if (!document) return;
    const updatedDocument = leaveTranslation(document, selectedWordsIndexes);

    const updatedDocuments = documents.map((doc) =>
      doc.sortKey === document!.sortKey ? updatedDocument : doc
    );
    setDocuments(updatedDocuments);
    setDocument(updatedDocument);

    handleCloseModal(flipCenterModal);
  }

  return (
    <button 
      className=' text-gray-200 rounded-md bg-red-500 hover:bg-red-800 px-2 py-1 md:px-4 md:py-2 '
      onClick={deleteBlock}
    >
      <div className=' flex gap-1 items-center md:text-base text-sm' >
        <AutoFixHigh /> 
        {t('document.modal.deleteBlockButton.cancelBlock')}
      </div>
    </button>
  )
}

export default React.memo(DeleteBlockButton);