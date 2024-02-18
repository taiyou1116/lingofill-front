import { useStore } from '@/store/store';
import { updateText } from '@/utils/request';

type Props = {
  sortKey: string,
  username: string,
  title: string,
  text: string,
}

function SendDocumentDataButton(props: Props) {
  const { sortKey, username, title, text } = props;

  const setDocuments = useStore((store) => store.setDocuments);
  const document = useStore((store) => store.document);
  const documents = useStore((store) => store.documents);

  const updateDocuments = async () => {
    const documentIndex = documents.findIndex((d) => d.sortKey === document!.sortKey);
    const newDocuments = [...documents];
    newDocuments[documentIndex] = document!;
    setDocuments(newDocuments);
    await updateText(username, sortKey, title, text)
  }

  const changeSendDataButton = () => {
    {
      return (
        <button 
          onClick={() => updateDocuments()}
          className=' bg-white rounded-lg py-2 px-4 border border-slate-800 hover:bg-slate-100'
        >
          テキストを更新する
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