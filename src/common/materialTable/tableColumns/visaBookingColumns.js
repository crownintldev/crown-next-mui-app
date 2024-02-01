import React, { useState } from 'react'
import { useMemo } from 'react'
import {
  renderStatusCell,
  defaultCellRenderer,
  dateFormat,
  defaultCellUpperCase,
  CellRowId
} from 'src/common/materialTable/tableColumnFunction'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import { IconButton } from '@mui/material'



const useTableColumns = openMediaDrawer =>
  useMemo(
    () => [
      {
        accessorKey: 'media',
        header: 'Media',
        size: 100,
        Cell: ({ row }) => (
          <IconButton onClick={() => openMediaDrawer(row)}>
            <PermMediaIcon sx={{ color: '#1EB280' }} />
          </IconButton>
        )
      },
      { accessorKey: '_id', header: 'ID', Cell: (CellRowId) },
      { accessorKey: 'status', header: 'Status', Cell: renderStatusCell },
      { accessorKey: 'passport.givenName', header: 'Given Name', Cell: defaultCellRenderer },
      { accessorKey: 'passport.surname', header: 'Surname', Cell: defaultCellRenderer },
      { accessorKey: 'passport.cnic', header: 'CNIC', Cell: defaultCellRenderer },
      { accessorKey: 'passport.country', header: 'Country', Cell: defaultCellUpperCase },
      { accessorKey: 'passport.dob', header: 'Date of Birth', Cell: dateFormat },
      { accessorKey: 'passport.doe', header: 'Date of Expiry', Cell: dateFormat },
      { accessorKey: 'passport.doi', header: 'Doi', Cell: dateFormat },
      { accessorKey: 'passport.fatherName', header: 'Father Name', Cell: defaultCellRenderer },
      { accessorKey: 'passport.gender', header: 'Gender', Cell: defaultCellRenderer },
      {
        accessorKey: 'passport.issuingAuthority',
        header: 'Issuing Authority',
        Cell: defaultCellRenderer
      },
      { accessorKey: 'passport.nationality', header: 'Nationality', Cell: defaultCellUpperCase },
      {
        accessorKey: 'passport.passportNumber',
        header: 'Passport Number',
        Cell: defaultCellRenderer
      },
      { accessorKey: 'passport.pob', header: 'Place of Birth', Cell: defaultCellRenderer },
      { accessorKey: 'passport.religion', header: 'Religion', Cell: defaultCellRenderer },
      { accessorKey: 'passport.remarks', header: 'Remarks', Cell: defaultCellRenderer },
      {
        accessorKey: 'passport.bookletNumber',
        header: 'Booklet Number',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'passport.trackingNumber',
        header: 'Tracking Number',
        Cell: defaultCellRenderer
      },

      // passport end
      { accessorKey: 'onModel', header: 'Refer', Cell: defaultCellRenderer },
      { accessorKey: 'RefName', header: 'Refer Name', Cell: defaultCellRenderer },
      { accessorKey: 'phone', header: 'Phone', Cell: defaultCellRenderer },

      {
        accessorKey: 'processing.processingFee',
        header: 'Processing Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'processing.visaFee',
        header: 'Processing - Visa Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'confirmed.totalFee',
        header: 'Confirmed - Total Fee',
        Cell: defaultCellRenderer
      },
      { accessorKey: 'visa.category.name', header: 'Category', Cell: defaultCellRenderer },
      { accessorKey: 'visa.destination.name', header: 'Destination', Cell: defaultCellRenderer },
      { accessorKey: 'visa.type.name', header: 'Type', Cell: defaultCellRenderer },
      { accessorKey: 'visa.duration.name', header: 'Duration', Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  )

export default useTableColumns
