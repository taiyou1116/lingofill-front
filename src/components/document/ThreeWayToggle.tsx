"use client"

import React, { useState } from 'react';
import { ThemeProvider, ToggleButton, ToggleButtonGroup, createTheme, useMediaQuery, useTheme } from '@mui/material';
import { SelectedMode } from '@/types/types';
import { useStore } from '@/store/store';
import { TextSnippet, Translate, Visibility } from '@mui/icons-material';

function ThreeWayToggle() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // ダークモードまたはライトモードのテーマを動的に生成
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  const [selectedMode, setSelectedModeLocal] = useState<SelectedMode>('input');
  const setSelectedModeGlobal = useStore((store) => store.setSelectedMode);

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: SelectedMode,
  ) => {
    setSelectedModeLocal(newMode);
    if (newMode) {
      setSelectedModeGlobal(newMode);
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
              fontSize: '0.4rem', // モバイルデバイスのフォントサイズを小さくする
            },
            '&:first-of-type': {
              paddingLeft: '20px',
              paddingRight: '20px',
              borderTopLeftRadius: '16px', // 最初のボタンの左上の角を丸くする
              borderBottomLeftRadius: '16px', // 最初のボタンの左下の角を丸くする
            },
            '&:last-of-type': {
              paddingLeft: '20px',
              paddingRight: '20px',
              borderTopRightRadius: '16px', // 最後のボタンの右上の角を丸くする
              borderBottomRightRadius: '16px', // 最後のボタンの右下の角を丸くする
            },
          },'& .Mui-selected': {}
      }}
    >
      <ToggleButton value="edit"><Translate style={{fontSize: 15}} /> 編集</ToggleButton>
      <ToggleButton value="input"><TextSnippet style={{fontSize: 15}} /> 入力</ToggleButton>
    </ToggleButtonGroup>
    </ThemeProvider>
  );
}

export default ThreeWayToggle;
