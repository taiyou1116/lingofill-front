import { Menu, MenuItem, ThemeProvider, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import EditTitle from './EditTitle'
import DeleteTextButton from './DeleteTextButton'
import { MoreHoriz } from '@mui/icons-material'
import { useThemeMode } from '@/hooks/hooks'
import { GrobalStore } from '@/store/grobalStore'
import { useTranslation } from 'react-i18next'

type Props = {
  index: number,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setInputNameIndex: React.Dispatch<React.SetStateAction<number>>,
}

function SelectMore(props: Props) {
  const { index, setInput, setInputNameIndex } = props;

  const { t } = useTranslation();
  const { username, setDocument, setDocuments, document, documents } = GrobalStore();
  const theme = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState<null | number>(null);

  const handleClick = (event: any, index: number) => {
    setAnchorEl(event.currentTarget);
    setActiveMenuIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveMenuIndex(null);
  };

  return (
    <>
    <div className=' flex items-center gap-1'>
      <div onClick={(event) => handleClick(event, index)} className=" cursor-pointer">
        <Tooltip title={t('sidebarDocument.more')}>
          <MoreHoriz style={{fontSize: 25}} className=" dark:text-gray-200" />
        </Tooltip>
      </div>
    </div>
    <ThemeProvider theme={theme}>
      <Menu
        autoFocus={false}
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && activeMenuIndex !== null}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem className=" flex items-center gap-1">
          <EditTitle 
            setInput={setInput}
            setInputNameIndex={setInputNameIndex}
            documents={documents}
            index={activeMenuIndex!}
            handleClose={handleClose}
          />
        </MenuItem>
        <MenuItem className=" flex items-center gap-1">
          <DeleteTextButton 
            username={username}
            document={document!}
            setDocument={setDocument}
            documents={documents}
            setDocuments={setDocuments}
            index={activeMenuIndex!}
            handleClose={handleClose}
          />
        </MenuItem>
      </Menu>
    </ThemeProvider>
    </>
  )
}

export default SelectMore