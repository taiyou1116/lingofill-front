import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

function ThreeWayToggle() {
    const [alignment, setAlignment] = React.useState('preview');

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };
  
    return (
      <ToggleButtonGroup
        color="standard"
        value={alignment}
        exclusive
        onChange={handleChange}
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
                borderTopLeftRadius: '16px', // 最初のボタンの左上の角を丸くする
                borderBottomLeftRadius: '16px', // 最初のボタンの左下の角を丸くする
              },
              '&:nth-of-type(2)': {
                paddingLeft: '20px',
                paddingRight: '20px',
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
        <ToggleButton value="edit">編集</ToggleButton>
        <ToggleButton value="input">入力</ToggleButton>
      </ToggleButtonGroup>
    );
}

export default ThreeWayToggle;
