import { useMemo } from 'react'

import { defaultCellRenderer } from 'src/common/materialTable/tableColumnFunction'
import { dateFormat, ArrayCellRenderer } from 'src/common/materialTable/tableColumnFunction'
import PermMediaIcon from '@mui/icons-material/PermMedia'

const useSupplierColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'media',
        header: 'Media',
        size: 100,
        Cell: () => <PermMediaIcon sx={{ color: '#1EB280' }} />
      },

      { accessorKey: '_id', header: 'ID', size: 100 },
      { accessorKey: 'name', header: 'Name', Cell: defaultCellRenderer },
      { accessorKey: 'category.name', header: 'Category', Cell: defaultCellRenderer },
      { accessorKey: 'phone', header: 'Phone', Cell: defaultCellRenderer },
      { accessorKey: 'description', header: 'Description', Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useSupplierColumns
