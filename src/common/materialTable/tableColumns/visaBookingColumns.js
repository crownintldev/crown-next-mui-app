import React from 'react'
import { useMemo } from 'react'
import {
  renderStatusCell,
  defaultCellRenderer,
  dateFormat,
  defaultCellUpperCase
} from 'src/common/materialTable/tableColumnFunction'

const UseTableColumns = () =>
  useMemo(
    () => [
      { accessorKey: 'status', header: 'Status', Cell: renderStatusCell },
      { accessorKey: 'passportId.givenName', header: 'Given Name', Cell: defaultCellRenderer },
      { accessorKey: 'passportId.surname', header: 'Surname', Cell: defaultCellRenderer },
      {
        accessorKey: 'passportId.passportNumber',
        header: 'Passport Number',
        Cell: defaultCellRenderer
      },
      { accessorKey: 'passportId.dob', header: 'Date of Birth', Cell: dateFormat },
      { accessorKey: 'passportId.doe', header: 'Date of Expiry', Cell: dateFormat },
      { accessorKey: 'passportId.city', header: 'City', Cell: defaultCellUpperCase },

      { accessorKey: 'passportId.cnic', header: 'CNIC', Cell: defaultCellRenderer },
      { accessorKey: 'passportId.country', header: 'Country', Cell: defaultCellUpperCase },
      { accessorKey: 'passportId.doi', header: 'Doi', Cell: dateFormat },
      { accessorKey: 'passportId.fatherName', header: 'Father Name', Cell: defaultCellRenderer },
      { accessorKey: 'passportId.gender', header: 'Gender', Cell: defaultCellRenderer },
      {
        accessorKey: 'passportId.issuingAuthority',
        header: 'Issuing Authority',
        Cell: defaultCellRenderer
      },
      { accessorKey: 'passportId.nationality', header: 'Nationality', Cell: defaultCellUpperCase },
      { accessorKey: 'passportId.pob', header: 'Place of Birth', Cell: defaultCellRenderer },
      { accessorKey: 'passportId.religion', header: 'Religion', Cell: defaultCellRenderer },
      { accessorKey: 'passportId.remarks', header: 'Remarks', Cell: defaultCellRenderer },
      {
        accessorKey: 'passportId.bookletNumber',
        header: 'Booklet Number',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'passportId.trackingNumber',
        header: 'Tracking Number',
        Cell: defaultCellRenderer
      },

      // passport end
      { accessorKey: 'onModel', header: 'Refer', Cell: defaultCellRenderer },
      { accessorKey: 'RefName', header: 'Refer Name', Cell: defaultCellRenderer },
      { accessorKey: 'phone', header: 'Phone', Cell: defaultCellRenderer },

      {
        accessorKey: 'visaId.processing.processingFee',
        header: 'Processing Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'visaId.processing.visaFee',
        header: 'Processing - Visa Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'visaId.confirmed.totalFee',
        header: 'Confirmed - Total Fee',
        Cell: defaultCellRenderer
      },
      { accessorKey: 'visaId.category.name', header: 'Category', Cell: defaultCellRenderer },
      { accessorKey: 'visaId.destination.name', header: 'Destination', Cell: defaultCellRenderer },
      { accessorKey: 'visaId.type.name', header: 'Type', Cell: defaultCellRenderer },
      { accessorKey: 'visaId.duration.name', header: 'Duration', Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default UseTableColumns
