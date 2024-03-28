
import React from 'react'
import { useModal, useThemeMode } from '@/hooks/hooks';

import SelectLanguage from './SelectLanguage'
import Button from '@/components/ui/Button';

import { MoreHoriz } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider } from '@mui/material'

function MoreSelectLanguage() {
    // 言語選択Modalの開閉
  const theme = useThemeMode();
  const { open, handleOpen, handleClose } = useModal();
  
  return (
    <div>  
      <Button
        onClick={handleOpen}
        baseUI='rounded-lg p-1 border'
        light='bg-white'
        dark='dark:border-gray-900 dark:text-gray-300 dark:bg-gray-900'
      >
        <MoreHoriz style={{ fontSize: 35 }} />
      </Button>
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
  )
}

export default MoreSelectLanguage