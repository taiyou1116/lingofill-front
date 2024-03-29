
import React, { useState, useEffect } from 'react';
import { createTheme, useMediaQuery } from "@mui/material";
import { getCurrentUser } from 'aws-amplify/auth';

/**システムに合わせたテーマモードモード @returns テーマ */
export function useThemeMode() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return theme;
}

/** 端末ごとにUIを変更する @returns ウィンドウサイズ */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 初期サイズを設定

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

/** Modal開閉のhooks  */
export function useModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleOpen, handleClose };
}

/**localStorageに値があれば取得 なければデフォルトの値を格納後取得 */
export function useGetLocalStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      setValue(item);
    } else {
      localStorage.setItem(key, defaultValue);
      setValue(defaultValue);
    }
  }, []);

  return { value, setValue };
}

export function useGetUser() {

  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const { username } = await getCurrentUser();
        setUsername(username);
      } catch (e) {
        console.log(e);
        setUsername('');
      }
    };
    getUser();
  }, []);

  return username;
}
