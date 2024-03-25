import { useMemo } from 'react'

import { defaultCellRenderer,CellRowId,dateFormat, conditionValue } from 'src/common/materialTable/tableColumnFunction'

// In progress
const useHotelBookingColumns = () =>
  useMemo(
    () => [

      { accessorKey: '_id', header: 'ID', Cell: (CellRowId) },
      { accessorKey: 'hotelName', header: 'Hotel Name', Cell: defaultCellRenderer },
      { accessorKey: 'by', header: 'Refer Name', Cell: conditionValue },
      { accessorKey: 'supplier.name', header: 'Supplier', Cell: defaultCellRenderer },
      { accessorKey: 'remarks', header: 'Remarks', Cell: defaultCellRenderer },
      { accessorKey: 'hotelCost', header: 'Hotel Cost', Cell: defaultCellRenderer },
      { accessorKey: 'sellingPrice', header: 'Selling Price', Cell: defaultCellRenderer },
      { accessorKey: 'profit', header: 'Profit' },
      { accessorKey: 'discount', header: 'Discount' },
      { accessorKey: 'total', header: 'Total' },
      { accessorKey: 'paymentMethod.name', header: 'Payment Method' },
      { accessorKey: 'destination.name', header: 'Destination' },
      { accessorKey: 'category.name', header: 'Room Category' },
      { accessorKey: 'roomType.name', header: 'Room Type' },
      { accessorKey: 'noOfDays', header: 'No Of Days' },
      { accessorKey: 'noOfNights', header: 'No Of Nights' },
      { accessorKey: 'noOfBeds', header: 'No Of Beds' },
      { accessorKey: 'hotelArea', header: 'Hotel Area' },
      //   { accessorKey: 'files', header: 'Logo' },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useHotelBookingColumns
