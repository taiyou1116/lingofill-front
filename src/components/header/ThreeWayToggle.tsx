"use client"

import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { SelectedMode } from '@/types/types';
import { useStore } from '@/store/store';

function ThreeWayToggle() {
  const [selectedMode, setSelectedModeLocal] = useState<SelectedMode>('input');
  const setSelectedModeGlobal = useStore((store) => store.setSelectedMode);

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: SelectedMode,
  ) => {
    setSelectedModeLocal(newMode); // ローカルステートを更新
    if (newMode) {
      console.log(newMode);
      setSelectedModeGlobal(newMode); // グローバルステートを更新
    }
  };
  
  return (
    <ToggleButtonGroup
      color="standard"
      value={selectedMode}
      exclusive
      onChange={handleModeChange}
      aria-label="Platform"
      size='small'
      sx={{
        zIndex: 0,
        borderRadius: '16px', // ToggleButtonGroup全体の角を丸くする
        height: '35px',
          '& .MuiToggleButtonGroup-grouped': {
            color: 'black',
            '&:not(:first-of-type)': {
              borderRadius: '0px', // 最初のボタン以外は角丸を無効化
            },
            '&:first-of-type': {
              paddingLeft: '10px',
              paddingRight: '10px',
              borderTopLeftRadius: '16px', // 最初のボタンの左上の角を丸くする
              borderBottomLeftRadius: '16px', // 最初のボタンの左下の角を丸くする
            },
            '&:nth-of-type(2)': {
              paddingLeft: '30px',
              paddingRight: '30px',
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
      <ToggleButton value="preview">プレビュー</ToggleButton>
      <ToggleButton value="edit">翻訳</ToggleButton>
      <ToggleButton value="input">原文入力</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ThreeWayToggle;
