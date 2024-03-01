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
import { capitalizeCamelSpace } from 'src/utils/helperfunction';

const TableColumn = (accessorKey, header, Cell = defaultCellRenderer) => {
  return { accessorKey, header: header || capitalizeCamelSpace(accessorKey), Cell };
};

const usePaymentHeadColumns = (openMediaDrawer) =>
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
      TableColumn('title'),
      TableColumn('onModel',"Category"),
      TableColumn('paymentData', 'Payment Date', dateFormat),
      TableColumn('type.name',"Type Name"),
      TableColumn('amount'),
      TableColumn('description'),
      TableColumn('paymentMethod'),
      TableColumn('createdAt', 'Created At', dateFormat),
      TableColumn('updatedAt', 'Updated At', dateFormat)
    ],
    []
  );

export default usePaymentHeadColumns;
