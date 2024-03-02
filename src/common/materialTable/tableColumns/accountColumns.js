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

export const useTableColumns = (openMediaDrawer) =>
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
      { accessorKey: '_id', header: 'ID', size: 100, Cell: CellRowId },
      { accessorKey: 'onModel', header: 'Refer', size: 100, Cell: defaultCellRenderer },
      { accessorKey: 'by', header: 'Refer Name', Cell: conditionValue },
      { accessorKey: 'by.phone', header: 'Refer Phone #' },
      { accessorKey: 'totalPassport', header: 'Total Passport', size: 100 },
      {
        accessorKey: 'paid',
        header: 'Paid Amount',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'remaining',
        header: 'Remaining Amount',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'total',
        header: 'Total Amount',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'supTotal',
        header: 'Suppliers Charges',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'discount',
        header: 'Discount',
        size: 100,
        Cell: defaultCellRenderer
      },
      { accessorKey: 'updatedAt', header: 'Date', size: 100, Cell: dateFormat }
    ],
    []
  );

export const useChildTableColumns = () =>
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
      accessorKey: 'supplierdetail.paymentway.totalFee',
      header: 'Sup - Confirmed',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'supplierdetail.paymentway.processingFee',
      header: 'Sup - Processing Fee',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'supplierdetail.total',
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
