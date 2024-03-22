
"use client"

import React, { useEffect, useState } from "react";
import { GrobalStore } from "@/store/grobalStore";
import { useTranslation } from "react-i18next";
import { oswald } from "@/store/fontStore";
import { splitTextToSegment, truncateText } from "@/utils/helper";
import InputDocument from "./InputDocument";
import TranslateDocument from "./TranslateDocument";
import StopAudio from "./header/StopAudio";
import SelectLanguage from "./header/SelectLanguage";
import SendDocumentDataButton from "./header/SendDocumentDataButton";
import ThreeWayToggle from "./header/ThreeWayToggle";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, LinearProgress, Menu, MenuItem, OutlinedInput, Select, SelectChangeEvent, ThemeProvider, Tooltip } from "@mui/material";
import { useThemeMode, useWindowSize } from "@/hooks/hooks";
import {  MoreHoriz, VolumeMute, VolumeUp } from "@mui/icons-material";

function DocumentComponent() {
  const { document, selectedMode, isLoading, isPlaying } = GrobalStore();

  const { t } = useTranslation();
  const { width } = useWindowSize();
  const isSm = width <= 425;
  const theme = useThemeMode();
  const [sentences, setSentences] = useState<string[]>([]);
  const [ isSelectedReading, setIsSelectedReading ] = useState<boolean>(false);

  useEffect(() => {
    if (document === null) return;
    const tempWords = splitTextToSegment(document.text, document.language);
    setSentences(tempWords);
  }, [document]);

  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState<number | string>('');

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const renderContentByMode = () => {
    if (document === null) {
      return (
        <div className=" dark:text-gray-300"> {t('document.chooseText')}</div>
      )
    }
    if (isLoading) {
      return (
        <div className=" flex h-full items-center justify-center">
          <Box sx={{ width: '30%' }}>
            <LinearProgress />
          </Box>
        </div>
      )
    }
    switch (selectedMode) {
      case 'edit':
        return (
          <TranslateDocument
            document={document}
            sentences={sentences!}
            isSelectedReading={isSelectedReading}
          />
        );
      case 'input':
        return (
          <InputDocument />
        );
      default:
        return <div>不明なモードです。</div>;
    }
  }

  const showToggle = () => {
    if (document === null) {
      return;
    }
    if (isSm) {
      return (
        <div className="fixed pt-10 mt-6 pb-3 flex flex-col w-full bg-gray-800/95">
          <div className=" flex pt-5 px-3 items-center justify-between">
            <ThreeWayToggle />
            <div className=" flex items-center gap-1">
              <div>  
                <button onClick={handleClickOpen}><MoreHoriz style={{ fontSize: 35 }} className="dark:text-gray-300  dark:bg-gray-900 rounded-lg p-1" /></button>
                <ThemeProvider theme={theme}>                
                  <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>言語選択</DialogTitle>
                    <DialogContent>
                      <SelectLanguage />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Ok</Button>
                    </DialogActions> 
                  </Dialog>
                </ThemeProvider>
              </div>
              <div className="bg-white border dark:border-gray-900 dark:bg-gray-900 rounded-lg p-1">
                { (!isSelectedReading)
                ?
                  <Tooltip 
                    title={t('document.header.aloud.onAloud')} 
                    className=" cursor-pointer p-1 hover:rounded 
                              dark:text-gray-300 
                              hover:bg-gray-200 
                              dark:hover:bg-gray-800" 
                    onClick={() => setIsSelectedReading(true)}
                  >
                    <VolumeMute style={{ fontSize: 25 }} />
                  </Tooltip>
                :
                  (!isPlaying)
                  ? 
                    <Tooltip 
                      title={t('document.header.aloud.offAloud')} 
                      className=" cursor-pointer p-1 rounded-md
                                dark:text-gray-300 
                                bg-gray-300 
                                dark:bg-gray-600" 
                      onClick={() => setIsSelectedReading(false)}
                    >
                      <VolumeUp style={{ fontSize: 25 }} />
                    </Tooltip>
                  :
                    <StopAudio />
                }
              </div>
            </div>
            <SendDocumentDataButton />
          </div>
        </div>
      )
    } else {
      return (
        <div className=" fixed pt-10 pb-3 w-full bg-gray-800/95 mt-6 pr-10 flex items-center justify-between">
          <div className=" flex gap-5 items-center">
            <h1 className={` dark:text-gray-100 text-xxs  ${oswald.className}`}>{ truncateText(document?.title, 20)}</h1>
            <ThreeWayToggle />
            <SelectLanguage />
            <div className=" flex gap-3 items-center">
              <div className="bg-white border dark:border-gray-900 dark:bg-gray-900 rounded-lg p-1">
                { (!isSelectedReading)
              ?
                <Tooltip 
                  title={t('document.header.aloud.onAloud')} 
                  className=" cursor-pointer p-1 hover:rounded 
                            dark:text-gray-300 
                            hover:bg-gray-200 
                            dark:hover:bg-gray-800" 
                  onClick={() => setIsSelectedReading(true)}
                >
                  <VolumeMute style={{ fontSize: 25 }} />
                </Tooltip>
              :
                (!isPlaying)
                ? 
                  <Tooltip 
                    title={t('document.header.aloud.offAloud')} 
                    className=" cursor-pointer p-1 rounded-md
                              dark:text-gray-300 
                              bg-gray-300 
                              dark:bg-gray-600" 
                    onClick={() => setIsSelectedReading(false)}
                  >
                    <VolumeUp style={{ fontSize: 25 }} />
                  </Tooltip>
                :
                  <StopAudio />
              }
              </div>
              
              {/* <div className=" flex gap-1 items-center bg-gray-900 rounded-lg p-1 text-gray-300 ">
                <Tooltip title='アンダーラインを引く' className=" cursor-pointer p-1 hover:rounded hover:bg-gray-800">
                  <FormatUnderlined style={{ fontSize: 25 }} />
                </Tooltip>
                <Tooltip title='アンダーラインの色を変える'>
                  <Palette style={{ fontSize: 25 }}  className=" cursor-pointer hover:text-gray-500" />
                </Tooltip>
              </div> */}
            </div>
          </div>
          <SendDocumentDataButton />
        </div>
      )
    }
  }

  return (
    <div className="h-full p-1 md:p-5 bg-gray-100 dark:bg-gray-800">
      { showToggle() }
      
      <div className=" h-5/6 pt-5">
      { renderContentByMode() }
      </div>
    </div>
  );
}

export default React.memo(DocumentComponent);