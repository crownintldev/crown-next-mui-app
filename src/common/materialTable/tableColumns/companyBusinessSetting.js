import { useMemo } from 'react'

import { defaultCellRenderer,CellRowId,dateFormat } from 'src/common/materialTable/tableColumnFunction'

const useBusinessSettingColumns = () =>
  useMemo(
    () => [

      { accessorKey: '_id', header: 'ID', Cell: (CellRowId) },
      { accessorKey: 'businessName', header: 'Business Name', Cell: defaultCellRenderer },
      { accessorKey: 'contact', header: 'Contact', Cell: defaultCellRenderer },
      { accessorKey: 'phone', header: 'Phone' },
      { accessorKey: 'email', header: 'Email', Cell: defaultCellRenderer },
      { accessorKey: 'businessAddress', header: 'Business Address', Cell: defaultCellRenderer },
      { accessorKey: 'referenceMember', header: 'Reference Member', Cell: defaultCellRenderer },
      { accessorKey: 'supplier', header: 'Supplier' },
    //   { accessorKey: 'files', header: 'Logo' },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useBusinessSettingColumns
