import { useStore } from '@/store/store';
import { Document } from '@/types/types';
import { updateText } from '@/utils/request';
import { CheckCircle, CloudUpload } from '@mui/icons-material';
import { memo } from 'react';

const MemoizedDocumentComponent = memo(SendDocumentDataButton);

function SendDocumentButtonMemo() {
  const {setDocuments, document, documents, username} = useStore((store) => ({
    setDocuments: store.setDocuments,
    document:     store.document,
    documents:    store.documents,
    username:     store.username,
  }));

  return (
    <div>
      <MemoizedDocumentComponent 
        document={document}
        documents={documents}
        setDocuments={setDocuments}
        username={username}
      />
    </div>
  );
}

export default SendDocumentButtonMemo;

type Props = {
  document: Document | null,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  username: string,
}

function SendDocumentDataButton(props: Props) {
  const { document, documents, setDocuments, username } = props;

  const updateDocuments = async () => {
    const documentIndex = documents.findIndex((d) => d.sortKey === document!.sortKey);
    const newDocuments = [...documents];
    newDocuments[documentIndex] = document!;
    try {
      const now = Date.now().toString();
      await updateText(username, document!.sortKey, document!.title, document!.text, document!.translations, document!.language, document!.translateLanguage, now);
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
          className=' bg-lime-400 dark:bg-lime-600 rounded-lg py-2 px-4 hover:bg-lime-500 dark:hover:bg-lime-700 flex gap-1 items-center'
        >
          <CloudUpload style={{fontSize: 20}} />
          <span className=' dark:text-gray-300 text-xxs'>テキストを保存する</span>
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
        <span className=' dark:text-gray-100  text-xxs'>テキスト保存済み</span>
       </div>
      : changeSendDataButton() }
    </div>
  )
}