import { useStore } from '@/store/store';
import { updateText } from '@/utils/request';
import { CheckCircle, CloudUpload } from '@mui/icons-material';

function SendDocumentDataButton() {

  const {setDocuments, document, documents, username} = useStore((store) => ({
    setDocuments: store.setDocuments,
    document:     store.document,
    documents:    store.documents,
    username:     store.username,
  }));

  const updateDocuments = async () => {
    const documentIndex = documents.findIndex((d) => d.sortKey === document!.sortKey);
    const newDocuments = [...documents];
    newDocuments[documentIndex] = document!;

    try {
      await updateText(username, document!.sortKey, document!.title, document!.text, document!.translations);
      newDocuments[documentIndex].isSynced = true;
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
          <span className=' dark:text-slate-300'>テキストを保存する</span>
        </button>
      )
    }
  }
 
  return ( 
    <div>
      { document?.isSynced 
      ? 
       <div className=' bg-none py-2 px-4 flex gap-1 items-center'>
        <CheckCircle className=' dark:text-slate-100' />
        <span className=' dark:text-slate-100'>テキスト保存済み</span>
       </div>
      : changeSendDataButton() }
    </div>
  )
}

export default SendDocumentDataButton;