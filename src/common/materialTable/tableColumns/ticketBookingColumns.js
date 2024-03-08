import React, { useState } from 'react';
import { useMemo } from 'react';
import {
  renderStatusCell,
  defaultCellRenderer,
  conditionValue,
  dateFormat,
  defaultCellUpperCase,
  CellRowId,
  modelCondition
} from 'src/common/materialTable/tableColumnFunction';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { IconButton } from '@mui/material';

const useTicketBookingColumns = (openMediaDrawer) =>
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
      { accessorKey: '_id', header: 'ID', Cell: CellRowId },
      { accessorKey: 'by', header: 'Refer Name', Cell: conditionValue },
      { accessorKey: 'by.phone', header: 'Phone', Cell: defaultCellRenderer },
      {
        accessorKey: 'invoiceNumber',
        header: 'Invoice #',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'ticketNumber',
        header: 'Ticket #',
        Cell: defaultCellRenderer
      },
      { accessorKey: 'status', header: 'Status', Cell: renderStatusCell },
      { accessorKey: 'invoiceDate', header: 'Invoice Date', Cell: dateFormat },
   
      { accessorKey: 'customer', header: 'Customer', Cell: defaultCellUpperCase },

      { accessorKey: 'sector', header: 'sector', Cell: defaultCellUpperCase },
      // {
      //   accessorKey: 'referenceMember',
      //   header: 'Reference Member',
      //   Cell: defaultCellUpperCase
      // },
      { accessorKey: 'airline', header: 'Airline', Cell: defaultCellUpperCase },
      { accessorKey: 'ticketCost', header: 'Ticket Cost', Cell: defaultCellRenderer },
      { accessorKey: 'sellingPrice', header: 'Selling Price', Cell: defaultCellRenderer },
      { accessorKey: 'profit', header: 'Profit', Cell: defaultCellRenderer },
      { accessorKey: 'discount', header: 'Discount', Cell: defaultCellRenderer },
      { accessorKey: 'total', header: 'Total', Cell: defaultCellRenderer },
      { accessorKey: 'profit', header: 'Profit', Cell: defaultCellRenderer },
      { accessorKey: 'paidByCustomer', header: 'Paid By Customer', Cell: defaultCellRenderer },
      { accessorKey: 'balance', header: 'Balance', Cell: defaultCellRenderer },
      { accessorKey: 'paymentMethod.name', header: 'Payment Method', Cell: defaultCellRenderer },
      { accessorKey: 'paymentDescription', header: 'Payment Description', Cell: defaultCellRenderer },

      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  );

export default useTicketBookingColumns;
