import { useMemo } from 'react'

import { defaultCellRenderer } from 'src/common/materialTable/tableColumnFunction'
import { dateFormat } from 'src/common/materialTable/tableColumnFunction'
import PermMediaIcon from '@mui/icons-material/PermMedia'

const useSupplierVisaService = () =>
  useMemo(
    () => [
      {
        accessorKey: 'media',
        header: 'Media',
        size: 100,
        Cell: () => <PermMediaIcon sx={{ color: '#1EB280' }} />
      },

      { accessorKey: '_id', header: 'ID', size: 100 },
      { accessorKey: 'supplier.name', header: 'Supplier Name', Cell: defaultCellRenderer },
      { accessorKey: 'destination.name', header: 'Destination', Cell: defaultCellRenderer },
      { accessorKey: 'type.name', header: 'Type', Cell: defaultCellRenderer },
      { accessorKey: 'category.name', header: 'Category', Cell: defaultCellRenderer },
      { accessorKey: 'duration.name', header: 'Duration', Cell: defaultCellRenderer },
      { accessorKey: 'supplier.phone', header: 'Supplier Phone', Cell: defaultCellRenderer },
      { accessorKey: 'supplier.category', header: 'Supplier Category', Cell: defaultCellRenderer },
      {
        accessorKey: 'supplier.description',
        header: 'Supplier Description',
        Cell: defaultCellRenderer
      },
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
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useSupplierVisaService
