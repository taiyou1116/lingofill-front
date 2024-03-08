import { ContentPaste } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  setUserInput: React.Dispatch<React.SetStateAction<string>>,
}

function PasteButton(props: Props) {
  const { t } = useTranslation();
  const { setUserInput } = props;

  const getClipboardText = async () => {
    const text = await navigator.clipboard.readText();
    setUserInput(text);
  }

  return (
    <div className=' flex items-center gap-2 text-xs dark:text-gray-400'>
        {t('document.modal.inputMemo.inputMemo')}
        <Tooltip title='クリップボードからペースト' className=' cursor-pointer' onClick={getClipboardText}>
          <ContentPaste style={{ fontSize: 20 }} />
        </Tooltip>
      </div>
  )
}

export default PasteButton