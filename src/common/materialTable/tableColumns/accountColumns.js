// React Imports
import { useMemo } from 'react'

// MUI Imports
import PermMediaIcon from '@mui/icons-material/PermMedia'
import { IconButton } from '@mui/material'

// Normal Imports
import {
  renderStatusCell,
  defaultCellRenderer,
  defaultCellUpperCase,
  conditionValue,
  dateFormat,
  CellRowId
} from 'src/common/materialTable/tableColumnFunction'

export const useTableColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'media',
        header: 'Media',
        size: 100,
        Cell: () => (
          <IconButton>
            <PermMediaIcon sx={{ color: '#1EB280' }} />
          </IconButton>
        )
      },
      { accessorKey: '_id', header: 'ID', Cell: (CellRowId) },
      { accessorKey: 'onModel', header: 'Refer', size: 100, Cell: defaultCellRenderer },
      { accessorKey: 'by', header: 'Refer Name', Cell: conditionValue },
      { accessorKey: 'by.phone', header: 'Refer Phone #' },
      { accessorKey: 'totalPassport', header: 'Total Passport', size: 100 },
      { accessorKey: 'amount.paid', header: 'Paid Amount', size: 100,Cell:defaultCellRenderer },
      { accessorKey: 'amount.remaining', header: 'Remaining Amount', size: 100,Cell:defaultCellRenderer },
      { accessorKey: 'amount.total', header: 'Total Amount', size: 100,Cell:defaultCellRenderer },
      { accessorKey: 'amount.discount', header: 'Discount', size: 100,Cell:defaultCellRenderer },
      { accessorKey: 'updatedAt', header: 'Date', size: 100, Cell: dateFormat }
    ],
    []
  )

export const useChildTableColumns = () =>
  useMemo(() => [
    { accessorKey: 'status', header: 'Status', Cell: renderStatusCell },
    {
      accessorKey: 'passport.passportNumber',
      header: 'Passport Number'
    },
    { accessorKey: 'passport.givenName', header: 'Given Name', Cell: defaultCellRenderer },
    {
      accessorKey: 'processing.processingFee',
      header: 'Processing Fee',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'processing.visaFee',
      header: 'Processing - Visa Fee',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'confirmed.totalFee',
      header: 'Confirmed - Total Fee',
      Cell: defaultCellRenderer
    },
    // minWidth converted to size
    { accessorKey: 'visaId.destination', header: 'Destination', Cell: defaultCellRenderer },
    { accessorKey: 'visaId.category', header: 'Category', Cell: defaultCellRenderer },
    { accessorKey: 'visaId.type', header: 'Type', Cell: defaultCellRenderer },
    { accessorKey: 'visaId.duration', header: 'Duration', Cell: defaultCellRenderer }
  ])

// export default useTableColumns
