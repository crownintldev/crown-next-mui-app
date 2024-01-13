import React, { useState } from 'react'
import { handleExportRows, handleExportData } from '../functions'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'

const ExportButton = ({ tableData, table }) => {
  const [exportToggle, setExportToggle] = useState(null)
  const toggleExport = Boolean(exportToggle)

  const handleExport = event => {
    setExportToggle(event.currentTarget)
  }

  const handleClose = () => {
    setExportToggle(null)
  }

  return (
    <div>
      <IconButton onClick={handleExport}>
        <Icon fontSize='1.5rem' icon='ph:export-bold' color='#2b60fe' />
      </IconButton>
      <Menu anchorEl={exportToggle} open={toggleExport} onClose={handleClose}>
        <MenuItem onClick={handleClose} sx={{ py: 1, m: 0 }}>
          <Box
            onClick={() => handleExportData(tableData)}
            sx={{
              fontSize: '0.8em',
              display: 'flex',
              alignItems: 'center',
              columnGap: '4px',
              color: '#2b60fe'
            }}
          >
            <FileDownloadIcon sx={{ fontSize: '1.2em' }} />
            Export All
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ py: 1, m: 0 }}>
          {/* disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} */}

          <Box
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            sx={{
              fontSize: '0.8em',
              display: 'flex',
              alignItems: 'center',
              columnGap: '4px',
              color: '#2b60fe'
            }}
          >
            <FileDownloadIcon sx={{ fontSize: '1.2em' }} />
            Export Selected
          </Box>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ExportButton
