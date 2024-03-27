
import { CloudUpload, Comment, DevicesOther, Language, Psychology, RecordVoiceOver, Translate } from '@mui/icons-material'
import React from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string,
}

function DocumentOverview(props: Props) {
  const { className } = props;
  const { t } = useTranslation();

  // textlgをclassnameで
  return (
    <div className=" flex flex-col gap-5 dark:text-gray-300">
      <div className={`font-bold ${ className }`}>{t('explanation.overview.one')}</div>
      <div className={`${className}`}>{t('explanation.overview.two')}</div>
      <div className={`grid grid-cols-2 gap-3 ${className}`} >
        <div className=" flex items-center gap-1"><Language /> {t('explanation.overview.three')}</div>
        <div className=" flex items-center gap-1"><Translate /> {t('explanation.overview.four')}</div>
        <div className=" flex items-center gap-1"><Psychology /> {t('explanation.overview.five')}</div>
        <div className=" flex items-center gap-1"><RecordVoiceOver /> {t('explanation.overview.six')}</div>
        <div className=" flex items-center gap-1"><Comment /> {t('explanation.overview.seven')}</div>
        <div className=" flex items-center gap-1"><CloudUpload /> {t('explanation.overview.eight')}</div>
        <div className=" flex items-center gap-1"><DevicesOther /> {t('explanation.overview.nine')}</div>
      </div>
    </div>
  )
}

export default DocumentOverview