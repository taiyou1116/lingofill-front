import { SelectChangeEvent } from "@mui/material";
import { changeLanguage } from "i18next";

/**
 * 新しい言語に設定
 * @param event 
 * @param setLanguage lnを受け取ってlanguageに設定
 */
export function handleLanguageChange(event: SelectChangeEvent, setLanguage: (ln: string) => void) {
  const newLanguage = event.target.value;
  localStorage.setItem('language', newLanguage);
  setLanguage(newLanguage);
  changeLanguage(newLanguage);
};