import { updateText } from '@/utils/request';

type Props = {
  sortKey: string,
  username: string,
  title: string,
  text: string,
}

function SendDocumentDataButton(props: Props) {
  const { sortKey, username, title, text } = props;

  const changeSendDataButton = () => {
    {
      return (
        <button 
          onClick={() => updateText(username, sortKey, title, text)}
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