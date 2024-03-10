
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContentCopy } from '@mui/icons-material'
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
  const { sentences, ln, shouldIncrement, words, className } = props;
  const { t } = useTranslation();

  return (
    <div>
      <ReadingButton 
        sentences={sentences}
        ln={ln}
        shouldIncrement={shouldIncrement}
      />
      <Tooltip 
        title={t('document.modal.readingButton.copy')} 
        className=' cursor-pointer hover:text-gray-300 dark:text-gray-300 dark:hover:text-gray-500' 
        onClick={() => navigator.clipboard.writeText(words)}
      >
        <ContentCopy style={{fontSize: 20}}/>
      </Tooltip>
      <span className={`selectedWordsContainer p-1 ${className}`}>
        { words }
      </span>
    </div>
  )
}

export default React.memo(ReadAndCopyContainer);