"use client"

import React, { useState } from 'react';
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';
import { useThemeMode, useWindowSize } from '@/hooks/hooks';
import { SelectedMode } from '@/types/types';
import { TextSnippet, Translate } from '@mui/icons-material';
import { ThemeProvider, ToggleButton, ToggleButtonGroup } from '@mui/material';

function ThreeWayToggle() {
  const { setSelectedMode } = GrobalStore();
  const { t } = useTranslation();
  const theme = useThemeMode();

  const { width } = useWindowSize();
  const isSm = width <= 768;

  const [selectedMode, setSelectedModeLocal] = useState<SelectedMode>('input');

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: SelectedMode,
  ) => {
    setSelectedModeLocal(newMode);
    if (newMode) {
      setSelectedMode(newMode);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup
        color="standard"
        value={selectedMode}
        exclusive
        onChange={handleModeChange}
        aria-label="Platform"
        size='small'
        sx={{
          zIndex: 0,
          height: '35px',
            '& .MuiToggleButtonGroup-grouped': {
              color: theme.palette.text.primary,
              fontSize: '0.875rem', // デフォルトフォントサイズ
              '@media (max-width:600px)': {
                fontSize: '0.6rem', // モバイルデバイスのフォントサイズを小さくする
              },
              '&:first-of-type': {
                paddingLeft: '20px',
                paddingRight: '20px',
                borderTopLeftRadius: '10px', // 最初のボタンの左上の角を丸くする
                borderBottomLeftRadius: '10px', // 最初のボタンの左下の角を丸くする
              },
              '&:last-of-type': {
                paddingLeft: '20px',
                paddingRight: '20px',
                borderTopRightRadius: '10px', // 最後のボタンの右上の角を丸くする
                borderBottomRightRadius: '10px', // 最後のボタンの右下の角を丸くする
              },
            },'& .Mui-selected': {}
        }}
      >
        <ToggleButton value="edit"><Translate style={{fontSize: 15}} />
          {isSm ? '' : t('document.header.threeWayToggle.edit') }
        </ToggleButton>
        <ToggleButton value="input"><TextSnippet style={{fontSize: 15}} />
          {isSm ? '' : t('document.header.threeWayToggle.input') }
        </ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}

export default React.memo(ThreeWayToggle);