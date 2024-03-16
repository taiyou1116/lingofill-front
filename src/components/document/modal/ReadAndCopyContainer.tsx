
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ContentCopy } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import ReadingButton from './ReadingButton';

type Props = {
  sentences: string[],
  ln: string,
  shouldIncrement: boolean,
  words: string,
  className?: string,
}

function ReadAndCopyContainer(props: Props) {
  const { sentences, ln, words, shouldIncrement, className } = props;
  const { t } = useTranslation();

  const [copied, setCopied] = useState<boolean>(false);

  const CopyText = () => {
    navigator.clipboard.writeText(words)
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <div>
      <ReadingButton 
        sentences={sentences}
        ln={ln}
        shouldIncrement={shouldIncrement}
      />
      { copied 
      ?
        <Tooltip 
          title={t('document.modal.readingButton.copied')} 
          className=' dark:text-gray-500' 
        >
          <Check style={{fontSize: 20}}/>
        </Tooltip>
      : 
        <Tooltip 
          title={t('document.modal.readingButton.copy')} 
          className=' cursor-pointer hover:text-gray-300 dark:text-gray-300 dark:hover:text-gray-500' 
          onClick={CopyText}
        >
          <ContentCopy style={{fontSize: 20}}/>
        </Tooltip>
      }
      
      <span className={`selectedWordsContainer p-1 ${className}`}>
        { words }
      </span>
    </div>
  )
}

export default React.memo(ReadAndCopyContainer);