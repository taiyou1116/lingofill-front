
import React, { useState } from 'react'
import { useThemeMode } from '@/hooks/hooks';

import SelectLanguage from './SelectLanguage'

import { MoreHoriz } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider } from '@mui/material'
import Button from '@/components/ui/Button';

function MoreSelectLanguage() {
    // 言語選択Modalの開閉
  const theme = useThemeMode();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div>  
      <Button
        onClick={handleClickOpen}
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