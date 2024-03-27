
import Image from 'next/image'
import { useThemeMode } from '@/hooks/hooks';
import { oswald } from '@/store/fontStore'
import { GrobalStore } from '@/store/grobalStore';

import i18n from '@/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { FormControl, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material';
import { handleLanguageChange } from '@/utils/i18nUtils';

type Props = {
  setLogin: (login: boolean) => void,
  titleClass?: string,
  buttonClass?: string,
  lingoFill?: string,
}

function DocumentHeader( props: Props) {
  const { setLogin, titleClass, buttonClass, lingoFill } = props;
  const { language, setLanguage } = GrobalStore();
  const theme = useThemeMode();
  const { t } = useTranslation();

  const transferHomeRoute = () => {
    window.open('https://www.lingo-fill.com/', '_blank');
  }

  return (
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
    <div className=" h-28 md:h-20 flex items-center justify-between shadow-md md:px-10 mb-5 bg-white dark:bg-gray-600">
      <div className=" flex items-center">
        <Image src="LF.svg" width="60" height="60" alt='ロゴ' />
        <h1 className={` ${titleClass} ${oswald.className} `}>{ lingoFill } </h1>
      </div>
      <div className=" flex items-center gap-3">
        <ThemeProvider theme={theme}>
          <div className=' flex items-center justify-between dark:text-gray-300'>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label={"language"}
                onChange={(event) => handleLanguageChange(event, setLanguage)}
              >
                <MenuItem value={'ja'}>日本語</MenuItem>
                <MenuItem value={'en'}>English</MenuItem>
                <MenuItem value={'es'}>Español</MenuItem>
                <MenuItem value={'zh'}>中国語</MenuItem>
                <MenuItem value={'hi'}>हिंदी</MenuItem>
              </Select>
            </FormControl>
          </div>
        </ThemeProvider>
        <div className=' flex flex-col md:flex-row gap-3 text-xs md:text-base'>
          <button 
            className={`bg-gray-200 rounded-md text-gray-800 ${buttonClass}`} 
            onClick={transferHomeRoute}>
            {t('explanation.header.logined')}
          </button>
          <button 
            className={` bg-blue-500 dark:bg-blue-800 rounded-md dark:text-white ${buttonClass}`} 
            onClick={() => setLogin(true)}>
            {t('explanation.header.newUser')}
          </button>
        </div>
      </div>
    </div>
    </I18nextProvider>
  )
}

export default DocumentHeader
