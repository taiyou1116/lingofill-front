import { useStore } from '@/store/store';
import { updateText } from '@/utils/request';
import { CloudUpload } from '@mui/icons-material';

function SendDocumentDataButton() {
  
  const setDocuments = useStore((store) => store.setDocuments);
  const document = useStore((store) => store.document);
  const documents = useStore((store) => store.documents);
  const username = useStore((store) => store.username);

  const updateDocuments = async () => {
    const documentIndex = documents.findIndex((d) => d.sortKey === document!.sortKey);
    const newDocuments = [...documents];
    newDocuments[documentIndex] = document!;
    setDocuments(newDocuments);
    await updateText(username, document!.sortKey, document!.title, document!.text);
  }

  const changeSendDataButton = () => {
    {
      return (
        <button 
          onClick={() => updateDocuments()}
          className=' bg-white rounded-lg py-2 px-4 border border-slate-800 hover:bg-slate-100 flex gap-1 items-center'
        >
          <CloudUpload style={{fontSize: 20}} />
          テキストを保存する
        </button>
      )
    }
  }
 
  return ( 
    <div>
      { changeSendDataButton() }
    </div>
  )
}

export default SendDocumentDataButton;