// React Imports
import { useMemo } from 'react';

// MUI Imports
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { IconButton } from '@mui/material';

// Normal Imports
import {
  renderStatusCell,
  defaultCellRenderer,
  defaultCellUpperCase,
  conditionValue,
  dateFormat,
  CellRowId
} from 'src/common/materialTable/tableColumnFunction';

export const useSupplierAccountColumn = (openMediaDrawer) =>
  useMemo(
    () => [

      { accessorKey: '_id', header: 'ID', size: 100, Cell: CellRowId },

      {
        accessorKey: 'total',
        header: 'Total',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'paid',
        header: 'Paid',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'discount',
        header: 'Discount',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'remaining',
        header: 'Remaining',
        size: 100,
        Cell: defaultCellRenderer
      },
   
      { accessorKey: 'updatedAt', header: 'Date', size: 100, Cell: dateFormat }
    ],
    []
  );

export const useChildSupplierAccountColumn = () =>
  useMemo(() => [
    { accessorKey: 'status', header: 'Status', Cell: renderStatusCell },
    {
      accessorKey: 'passport.passportNumber',
      header: 'Passport Number'
    },
    {
      accessorKey: 'passport.givenName',
      header: 'Given Name',
      Cell: defaultCellRenderer
    },
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
    {
      accessorKey: 'increment',
      header: 'Increment',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'supfee.totalFee',
      header: 'Sup - Confirmed',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'supfee.processingFee',
      header: 'Sup - Processing Fee',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'supfee.visaFee',
      header: 'Sup - Visa Fee',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'visaId.destination',
      header: 'Destination',
      Cell: defaultCellRenderer
    },
    { accessorKey: 'visaId.category', header: 'Category', Cell: defaultCellRenderer },
    { accessorKey: 'visaId.type', header: 'Type', Cell: defaultCellRenderer },
    { accessorKey: 'visaId.duration', header: 'Duration', Cell: defaultCellRenderer }
  ]);

// export default useTableColumns