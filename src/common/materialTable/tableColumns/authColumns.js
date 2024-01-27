import { useMemo } from 'react'

import { defaultCellRenderer } from 'src/common/materialTable/tableColumnFunction'
import { dateFormat } from 'src/common/materialTable/tableColumnFunction'

const useUserColumns = () =>
  useMemo(
    () => [
      // { accessorKey: '_id', header: 'ID', size: 100 },
      { accessorKey: 'userName', header: 'User Name', Cell: defaultCellRenderer },

      { accessorKey: 'email', header: 'Email', Cell: defaultCellRenderer },
      { accessorKey: 'roles.title', header: 'Roles', Cell: defaultCellRenderer },

      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useUserColumns
