import { Chip } from '@mui/material';
import { useMemo } from 'react'

import {
  defaultCellRenderer,
  ArrayCellRenderer
} from 'src/common/materialTable/tableColumnFunction'
import { dateFormat } from 'src/common/materialTable/tableColumnFunction'
 const memberArray = ({ cell }) => {
  const data = cell.getValue();
  return (
    <div>
      {data?.map((service) => (
        <Chip sx={{ mr: 1 }} key={service} label={service.by.fullName || service.by.companyName} />
      ))}
    </div>
  );
};
const useInvoiceColumns = () =>
  useMemo(
    () => [
      { accessorKey: 'invoiceNumber', header: 'Invoice Number', Cell: defaultCellRenderer },
      { accessorKey: 'invoiceData', header: 'Members', Cell: memberArray },
      { accessorKey: 'billingDetail.total', header: 'Total', Cell: defaultCellRenderer },
      { accessorKey: 'billingDetail.paid', header: 'Paid', Cell: defaultCellRenderer },
      { accessorKey: 'billingDetail.remaining', header: 'Remaining', Cell: defaultCellRenderer },
      // { accessorKey: 'billing.discount', header: 'Discount', Cell: defaultCellRenderer },
      { accessorKey: 'issueDate', header: 'Issue Date', Cell: dateFormat },
      { accessorKey: 'dueDate', header: 'Due Date', Cell: dateFormat }
    ],
    []
  )

export default useInvoiceColumns
