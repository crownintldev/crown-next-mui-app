import { useMemo } from 'react'

import { defaultCellRenderer,CellRowId,dateFormat } from 'src/common/materialTable/tableColumnFunction'

// In progress
const useHotelBookingColumns = () =>
  useMemo(
    () => [

      { accessorKey: '_id', header: 'ID', Cell: (CellRowId) },
      { accessorKey: 'hotelName', header: 'Hotel Name', Cell: defaultCellRenderer },
      { accessorKey: 'onModel', header: 'Refer Name' },
      { accessorKey: 'remarks', header: 'Remarks', Cell: defaultCellRenderer },
      { accessorKey: 'hotelCost', header: 'Hotel Cost', Cell: defaultCellRenderer },
      { accessorKey: 'sellingPrice', header: 'Selling Price', Cell: defaultCellRenderer },
      { accessorKey: 'profit', header: 'Profit' },
      { accessorKey: 'discount', header: 'Discount' },
      { accessorKey: 'total', header: 'Total' },
      { accessorKey: 'destination', header: 'Destination' },
      { accessorKey: 'noOfDays', header: 'No Of Days' },
      { accessorKey: 'noOfNights', header: 'No Of Nights' },
      { accessorKey: 'noOfBeds', header: 'No Of Beds' },
      { accessorKey: 'roomType', header: 'Room Type' },
      { accessorKey: 'hotelCategory', header: 'Room Category' },
      { accessorKey: 'hotelArea', header: 'Hotel Area' },
      { accessorKey: 'paymentMethod', header: 'Payment Method' },
      //   { accessorKey: 'files', header: 'Logo' },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useHotelBookingColumns
