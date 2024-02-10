import { useMemo } from 'react'

import { defaultCellRenderer,CellRowId } from 'src/common/materialTable/tableColumnFunction'
import { dateFormat } from 'src/common/materialTable/tableColumnFunction'

const useNameIdTableColumns = (header = 'title') =>
  useMemo(
    () => [

      { accessorKey: '_id', header: 'ID', Cell: (CellRowId) },
      { accessorKey: 'name', header: header, Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useNameIdTableColumns
