import React from 'react'
import { useMemo } from 'react'
import {
  renderStatusCell,
  defaultCellRenderer,
  defaultCellUpperCase,
  conditionValue,
  dateFormat
} from 'src/common/materialTable/tableColumnFunction'

const useTableColumns = () =>
  useMemo(
    () => [
      { accessorKey: '_id', header: 'ID', size: 100 },
      { accessorKey: 'visabooking.status', header: 'Status', Cell: renderStatusCell },
      { accessorKey: 'givenName', header: 'Given Name', Cell: defaultCellRenderer },
      { accessorKey: 'city', header: 'City', Cell: defaultCellUpperCase },
      { accessorKey: 'surname', header: 'Surname', Cell: defaultCellRenderer },
      { accessorKey: 'cnic', header: 'CNIC', Cell: defaultCellRenderer },
      { accessorKey: 'country', header: 'Country', Cell: defaultCellUpperCase },
      { accessorKey: 'dob', header: 'Date of Birth', Cell: defaultCellRenderer },
      { accessorKey: 'doe', header: 'Date of Expiry', Cell: defaultCellRenderer },
      { accessorKey: 'doi', header: 'Doi', Cell: defaultCellRenderer },
      { accessorKey: 'fatherName', header: 'Father Name', Cell: defaultCellRenderer },
      { accessorKey: 'gender', header: 'Gender', Cell: defaultCellRenderer },
      { accessorKey: 'issuingAuthority', header: 'Issuing Authority', Cell: defaultCellRenderer },
      { accessorKey: 'nationality', header: 'Nationality', Cell: defaultCellUpperCase },
      { accessorKey: 'onModel', header: 'Refer', Cell: defaultCellRenderer },
      {
        accessorKey: 'by',
        header: 'Refer Name',
        Cell: conditionValue
      },

      // { accessorKey: 'by.companyName', header: 'Company Name' },
      { accessorKey: 'by.phone', header: 'Refer Phone #', Cell: defaultCellRenderer },
      { accessorKey: 'passportNumber', header: 'Passport Number', Cell: defaultCellRenderer },
      { accessorKey: 'pob', header: 'Place of Birth', Cell: defaultCellRenderer },
      { accessorKey: 'religion', header: 'Religion', Cell: defaultCellRenderer },
      { accessorKey: 'remarks', header: 'Remarks', Cell: defaultCellRenderer },
      { accessorKey: 'bookletNumber', header: 'Booklet Number', Cell: defaultCellRenderer },
      { accessorKey: 'trackingNumber', header: 'Tracking Number', Cell: defaultCellRenderer },
      { accessorKey: 'updatedAt', header: 'Updated', Cell: dateFormat }
    ],
    []
  )

export default useTableColumns
