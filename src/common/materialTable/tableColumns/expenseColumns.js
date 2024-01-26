import { useMemo } from 'react'

import { defaultCellRenderer } from 'src/common/materialTable/tableColumnFunction'
import { dateFormat } from 'src/common/materialTable/tableColumnFunction'
import PermMediaIcon from '@mui/icons-material/PermMedia'

const useExpenseColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'media',
        header: 'Media',
        size: 100,
        Cell: () => <PermMediaIcon sx={{ color: '#1EB280' }} />
      },

      { accessorKey: '_id', header: 'ID', size: 100 },
      { accessorKey: 'title', header: 'Title', Cell: defaultCellRenderer },

      // { accessorKey: 'type', header: 'Type', Cell: defaultCellRenderer },
      // { accessorKey: 'category', header: 'Category', Cell: defaultCellRenderer },

      { accessorKey: 'price', header: 'Price', Cell: defaultCellRenderer },
      { accessorKey: 'description', header: 'Description', Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useExpenseColumns
