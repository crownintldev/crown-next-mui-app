import { useMemo } from 'react'

import { defaultCellRenderer,CellRowId,dateFormat } from 'src/common/materialTable/tableColumnFunction'

// In progress
const useBusinessSettingColumns = () =>
  useMemo(
    () => [

      { accessorKey: '_id', header: 'ID', Cell: (CellRowId) },
      { accessorKey: 'hotelName', header: 'Hotel Name', Cell: defaultCellRenderer },
      { accessorKey: 'remarks', header: 'Remarks', Cell: defaultCellRenderer },
      { accessorKey: 'supplier', header: 'Supplier' },
      { accessorKey: 'referenceMember', header: 'Reference Member' },
      { accessorKey: 'hotelCost', header: 'Hotel Cost', Cell: defaultCellRenderer },
      { accessorKey: 'sellingCost', header: 'Selling Cost', Cell: defaultCellRenderer },
      { accessorKey: 'profit', header: 'Profit' },
      { accessorKey: 'discount', header: 'Discount' },
      { accessorKey: 'total', header: 'Total' },
      { accessorKey: 'destination', header: 'Destination' },
      { accessorKey: 'noOfDays', header: 'No Of Days' },
      { accessorKey: 'noOfNights', header: 'No Of Nights' },
      { accessorKey: 'noOfBeds', header: 'No Of Beds' },
      { accessorKey: 'noOfNights', header: 'No Of Nights' },
      //   { accessorKey: 'files', header: 'Logo' },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useBusinessSettingColumns
