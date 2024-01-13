import { useMemo } from 'react'

import { defaultCellRenderer } from 'src/common/materialTable/tableColumnFunction'
import { dateFormat, ArrayCellRenderer } from 'src/common/materialTable/tableColumnFunction'

const useSupplierColumns = () =>
  useMemo(
    () => [
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
