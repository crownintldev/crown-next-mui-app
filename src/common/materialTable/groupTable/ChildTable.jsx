import React, { useState } from 'react'
import { useMaterialReactTable, MRT_Table } from 'material-react-table'

import { Box, IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export const ChildTable = ({
  row,
  childColumns,
  childRowSelection,
  handleChildRowSelectionChange,
  visaBookingIds
}) => {
  console.log('++++++++++++++', visaBookingIds)
  const [globalFilter, setGlobalFilter] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(false)
  const parentRowId = row.original._id

  const handleChildRowSelectionChangeParentId = selection => {
    handleChildRowSelectionChange(selection, parentRowId)
  }

  const childTable = useMaterialReactTable({
    columns: childColumns,
    data: row.original.visaBookingIds || [],
    enableRowSelection: true,
    getRowId: childRow => childRow._id,
    onRowSelectionChange: handleChildRowSelectionChangeParentId,

    state: {
      rowSelection: childRowSelection
    },
    enableGlobalFilter: true,
    globalFilter,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mrtTheme: theme => ({
      baseBackgroundColor: theme.palette.background.default //change default background color
    }),
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        boxShadow: 'none !important'
      }
    },
    muiTableHeadCellProps: {
      sx: {
        fontSize: '0.9em!important',
        padding: '4px!important',
        border: '1px solid rgba(81, 81, 81, .1)',
        fontWeight: 'normal'
      }
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: '0.9em!important',
        padding: '4px!important',
        border: '1px solid rgba(81, 81, 81, .1)'
      }
    },
    muiSelectAllCheckboxProps: {
      sx: {
        padding: '11px!important'
      }
    },
    muiSelectCheckboxProps: {
      sx: {
        padding: '11px!important'
      }
    }
  })

  return (
    <Box sx={{ padding: '10px' }} className='custom-child-table'>
      {/* <IconButton onClick={() => setShowSearchBar(!showSearchBar)}>
        <SearchIcon />
      </IconButton> */}
      {visaBookingIds && visaBookingIds.length > 6 && (
        <TextField
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder='Search...'
          variant='outlined'
          size='small'
          style={{ marginBottom: '10px' }}
          sx={{
            marginBottom: '10px',
            '& .MuiOutlinedInput-input': {
              padding: '4.5px 14px !important'
            }
          }}
        />
      )}

      <MRT_Table table={childTable} />
    </Box>
  )
}
