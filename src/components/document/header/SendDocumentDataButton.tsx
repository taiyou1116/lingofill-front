
import React from 'react';
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';
import { updateText } from '@/utils/request';
import { CheckCircle, CloudUpload } from '@mui/icons-material';

function SendDocumentDataButton() {
  const { document, documents, setDocuments, username } = GrobalStore();
  const { t } = useTranslation();

  const updateDocuments = async () => {
    if (document === null) return;

    const documentIndex = documents.findIndex((d) => d.sortKey === document!.sortKey);
    const newDocuments = [...documents];
    newDocuments[documentIndex] = document!;

    try {
      const now = Date.now().toString();
      await updateText(username, 
                       document.sortKey, 
                       document.title, 
                       document.text, 
                       document.translations, 
                       document.language, 
                       document.translateLanguage, 
                       now);
    
      newDocuments[documentIndex].isSynced = true;
      newDocuments[documentIndex].updatedAt = now;
      newDocuments.sort((a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt));
      
    } catch(error) {
      console.error(error);
      newDocuments[documentIndex].isSynced = false;

    } finally {
      setDocuments(newDocuments);
    }
  }

  const changeSendDataButton = () => {
    {
      return (
        <button 
          onClick={() => updateDocuments()}
          className=' bg-lime-400 
                      dark:bg-lime-600  
                      hover:bg-lime-500 
                      dark:hover:bg-lime-700 
                      flex gap-1 items-center rounded-lg py-2 px-4'
        >
          <CloudUpload style={{fontSize: 20}} className=' dark:text-gray-100' />
          <span className=' dark:text-gray-300 text-xxs'>{t('document.header.sendDocumentDataButton.saveText')}</span>
        </button>
      )
    }
  }
 
  return ( 
    <div>
      { document?.isSynced 
      ? 
       <div className=' bg-none py-2 px-4 flex gap-1 items-center'>
        <CheckCircle className=' dark:text-gray-100' />
        <span className=' dark:text-gray-300  text-xxs'>{t('document.header.sendDocumentDataButton.savedText')}</span>
       </div>
      : changeSendDataButton() }
    </div>
  )
}

export default React.memo(SendDocumentDataButton);