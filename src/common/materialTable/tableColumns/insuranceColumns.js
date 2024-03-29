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

const useInsuranceColumns = (openMediaDrawer) =>
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
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'onModel', header: 'Refer Name' },
      
      { accessorKey: 'insuranceCompany.name', header: 'Insurance company', Cell: defaultCellUpperCase },
      { accessorKey: 'type.name', header: 'Insurance Type', Cell: defaultCellUpperCase },
      { accessorKey: 'category.name', header: 'Insurance Category', Cell: defaultCellUpperCase },
      { accessorKey: 'duration.name', header: 'Insurance Type', Cell: defaultCellUpperCase },
      //   { accessorKey: 'supplier', header: 'Supplier ID', Cell: defaultCellUpperCase },
      
      { accessorKey: 'insuranceCost', header: 'Insurance Cost', Cell: defaultCellRenderer },
      { accessorKey: 'sellingCost', header: 'Selling Price', Cell: defaultCellRenderer },
      { accessorKey: 'discount', header: 'Discount', Cell: defaultCellRenderer },
      { accessorKey: 'profit', header: 'Profit', Cell: defaultCellRenderer },
      {
          accessorKey: 'paymentMethod.name',
          header: 'Payment Method',
          Cell: defaultCellUpperCase
        },
      { accessorKey: 'remarks', header: 'Remarks', Cell: defaultCellRenderer },
      { accessorKey: 'createdAt', header: 'Created At', Cell: dateFormat },
      { accessorKey: 'updatedAt', header: 'Updated At', Cell: dateFormat }
    ],
    []
  );

export default useInsuranceColumns;
