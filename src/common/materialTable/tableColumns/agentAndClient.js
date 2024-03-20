import { useMemo } from 'react'

import { defaultCellRenderer,CellRowId,dateFormat } from 'src/common/materialTable/tableColumnFunction'

const useAgentAndClientColumns = () =>
  useMemo(
    () => [
      { accessorKey: 'rowNum', header: 'ID'},
      { accessorKey: 'fullName', header: 'Full Name', Cell: defaultCellRenderer },
      { accessorKey: 'phone', header: 'Phone', Cell: defaultCellRenderer },
      { accessorKey: 'passportCount', header: 'passportCount' },
      { accessorKey: 'cnic', header: 'Cnic', Cell: defaultCellRenderer },
      { accessorKey: 'address', header: 'Address', Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useAgentAndClientColumns
