// import { useStore } from '@/store/store';
// import { Document } from '@/types/types';
import { updateText } from '@/utils/request';

type Props = {
  sortKey: string,
  username: string,
  title: string,
  text: string,
}

function SendDocumentDataButton(props: Props) {
  const { sortKey, username, title, text } = props;

  // const setDocuments = useStore((store) => store.setDocuments);
  // const documents = useStore((store) => store.documents);
  
  // const postTextAndStoresortKey = async () => {
  //   // postTextから返される新しいsortKeyを取得
  //   const newSortKey: string = await postText(username, title, text);
  //   // 新しいドキュメントの情報を作成
  //   const newDocument: Document = { 
  //     sortKey: newSortKey,
  //     title: title,
  //     text: text,
  //   };
  //   // 新しいドキュメントをdocuments配列の先頭に追加
  //   setDocuments([newDocument, ...documents]);
  // }

  const changeSendDataButton = () => {
    {
      return (
        <button 
          onClick={() => updateText(username, sortKey, title, text)}
          className=' bg-white rounded-lg py-2 px-4 hover:border border-slate-800'
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