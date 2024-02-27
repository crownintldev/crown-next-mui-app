import { useMemo } from 'react'

import { defaultCellRenderer,CellRowId} from 'src/common/materialTable/tableColumnFunction'
import { dateFormat } from 'src/common/materialTable/tableColumnFunction'

const useExpenseColumns = () =>
  useMemo(
    () => [
      { accessorKey: '_id', header: 'ID', Cell: (CellRowId) },
      { accessorKey: 'title', header: 'Title', Cell: defaultCellRenderer },

      { accessorKey: 'type.name', header: 'Type', Cell: defaultCellRenderer },
      { accessorKey: 'category.name', header: 'Category', Cell: defaultCellRenderer },

      { accessorKey: 'price', header: 'Price', Cell: defaultCellRenderer },
      { accessorKey: 'description', header: 'Description', Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useExpenseColumns
