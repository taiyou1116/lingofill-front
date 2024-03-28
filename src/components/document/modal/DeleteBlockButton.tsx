
import React from 'react'
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';

import { leaveTranslation } from '@/utils/textUtils';
import Button from '@/components/ui/Button';

import { AutoFixHigh } from '@mui/icons-material';

function DeleteBlockButton() {
  const { t } = useTranslation();
  const { document, documents, setDocument, setDocuments, flipCenterModal, selectedWordsIndexes } = GrobalStore();

  const deleteBlock = () => {
    if (!document) return;
    const updatedDocument = leaveTranslation(document, selectedWordsIndexes);

    const updatedDocuments = documents.map((doc) =>
      doc.sortKey === document!.sortKey ? updatedDocument : doc
    );
    setDocuments(updatedDocuments);
    setDocument(updatedDocument);

    flipCenterModal();
  }

  return (
    <Button
      onClick={deleteBlock}
      baseUI='px-2 py-1 md:px-4 md:py-2 rounded-md text-sm flex gap-1 items-center md:text-base'
      light='bg-red-500 hover:bg-red-800 text-gray-200'
      dark='bg-red-500 hover:bg-red-800 text-gray-200'
    >
      <AutoFixHigh /> 
      {t('document.modal.deleteBlockButton.cancelBlock')}
    </Button>
  )
}

export default React.memo(DeleteBlockButton);