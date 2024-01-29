import { useMemo } from 'react'

import { defaultCellRenderer } from 'src/common/materialTable/tableColumnFunction'
import { dateFormat } from 'src/common/materialTable/tableColumnFunction'

const useCompanyColumns = () =>
  useMemo(
    () => [

 { accessorKey: '_id', header: 'ID', size: 100 },
      { accessorKey: 'companyName', header: 'Company Name', Cell: defaultCellRenderer },
      { accessorKey: 'licenseNo', header: 'License #', Cell: defaultCellRenderer },
      { accessorKey: 'phone', header: 'Phone', Cell: defaultCellRenderer },
      { accessorKey: 'ownerContact', header: 'Owner Contact', Cell: defaultCellRenderer },
      { accessorKey: 'cnic', header: 'Cnic', Cell: defaultCellRenderer },
      { accessorKey: 'address', header: 'Address', Cell: defaultCellRenderer },
      { accessorKey: 'passportCount', header: 'Visa Passport', Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useCompanyColumns
