import { useMemo } from 'react'

import {
  defaultCellRenderer,
  ArrayCellRenderer
} from 'src/common/materialTable/tableColumnFunction'
import { dateFormat } from 'src/common/materialTable/tableColumnFunction'

const useInvoiceColumns = () =>
  useMemo(
    () => [
      { accessorKey: 'invoiceNumber', header: 'Invoice Number', Cell: defaultCellRenderer },
      { accessorKey: 'members', header: 'Members', Cell: ArrayCellRenderer },
      { accessorKey: 'billing.total', header: 'Total', Cell: defaultCellRenderer },
      { accessorKey: 'billing.paid', header: 'Paid', Cell: defaultCellRenderer },
      { accessorKey: 'billing.remaining', header: 'Remaining', Cell: defaultCellRenderer },
      { accessorKey: 'billing.discount', header: 'Discount', Cell: defaultCellRenderer },
      { accessorKey: 'issueDate', header: 'Issue Date', Cell: dateFormat },
      { accessorKey: 'dueDate', header: 'Due Date', Cell: dateFormat }
    ],
    []
  )

export default useInvoiceColumns
