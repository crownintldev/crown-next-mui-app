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

const useSupplierAccountPaymentHistory = () =>
  useMemo(
    () => [
      TableColumn('_id', 'ID', CellRowId),
      TableColumn('paymentMethod.name', 'Payment Method'),
      TableColumn('paid'),
      TableColumn('paymentDescription'),
      TableColumn('supplier.name', 'Supplier Name'),
      TableColumn('supplier.phone', 'Supplier Phone'),
      TableColumn('createdAt', 'Created At', dateFormat),
      TableColumn('updatedAt', 'Updated At', dateFormat)
    ],
    []
  );

export default useSupplierAccountPaymentHistory;
