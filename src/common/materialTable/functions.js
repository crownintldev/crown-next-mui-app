import { mkConfig, generateCsv, download } from 'export-to-csv'

export const hasSubRows = data => {
  return data.some(row => row.subRows && row.subRows.length > 0)
}

//export csv,pdf function
const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true
})
export const handleExportRows = rows => {
  const rowData = rows.map(row => row.original)
  const csv = generateCsv(csvConfig)(rowData)
  download(csvConfig)(csv)
}
export const handleExportData = data => {
  const csv = generateCsv(csvConfig)(data)
  download(csvConfig)(csv)
}
//end export csv,pdf function

//style
export const muiLinearProgressProps = (isTopToolbar, table) => ({
  style: {
    height: isTopToolbar ? '3px' : '2px', // Example of dynamic height based on the table state
    marginTop: '20px'
  }
})

export const tableProps = theme => {
  return {
    muiTableHeadCellProps: {
      sx: {
        fontSize: '0.9em!important',
        padding: '0!important',
        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
      }
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: '0.9em',
        padding: '4px!important',
        color:
          theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.8)!important'
            : 'rgba(0,0,0,0.8)!important'
      }
    },
    muiSelectAllCheckboxProps: {
      sx: {
        padding: '5px!important'
      }
    },
    muiSelectCheckboxProps: {
      sx: {
        padding: '5px!important'
      }
    }
  }
}
