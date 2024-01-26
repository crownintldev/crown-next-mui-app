import { useMemo } from 'react'

import { defaultCellRenderer } from 'src/common/materialTable/tableColumnFunction'
import { dateFormat } from 'src/common/materialTable/tableColumnFunction'
import PermMediaIcon from '@mui/icons-material/PermMedia'

const useAgentAndClientColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'media',
        header: 'Media',
        size: 100,
        Cell: () => <PermMediaIcon sx={{ color: '#1EB280' }} />
      },

      { accessorKey: '_id', header: 'ID', size: 100 },
      { accessorKey: 'fullName', header: 'Full Name', Cell: defaultCellRenderer },
      { accessorKey: 'phone', header: 'Phone', Cell: defaultCellRenderer },
      { accessorKey: 'cnic', header: 'Cnic', Cell: defaultCellRenderer },
      { accessorKey: 'passportNumber', header: 'Passport Number', Cell: defaultCellRenderer },
      { accessorKey: 'address', header: 'Address', Cell: defaultCellRenderer },
      { accessorKey: 'passportCount', header: 'Visa Passport', Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useAgentAndClientColumns
