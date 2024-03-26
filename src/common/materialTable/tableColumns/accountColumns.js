// React Imports
import { useMemo } from 'react';

// MUI Imports
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { IconButton } from '@mui/material';
const uppercase = (value) => <div style={{ textTransform: 'uppercase' }}>{value}</div>;
// Normal Imports
import {
  renderStatusCell,
  defaultCellRenderer,
  defaultCellUpperCase,
  conditionValue,
  dateFormat,
  CellRowId
} from 'src/common/materialTable/tableColumnFunction';

 const myConditionValue = ({ row }) => {
  const data = row.original.by;
 
  return data?.fullName ? (
    <div style={{ display: 'flex' }}>
      {uppercase(data?.fullName)}&nbsp;
      {data.refer && (
        <span style={{ border: '1px solid green' }}>{data?.refer.substring(0, 2)}</span>
      )}
    </div>
  ) : (
    <>
      {uppercase(data?.companyName)}&nbsp;
      {data?.refer && (
        <span style={{ border: '1px solid green' }}>{data?.refer.substring(0, 2)}</span>
      )}
    </>
  );
};
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
      { accessorKey: "agent.fullName",header: 'Refer Name',Cell:myConditionValue },
      { accessorKey: 'by.phone', header: 'Refer Phone #' },
      { accessorKey: 'totalPassport', header: 'Total Passport', size: 100 },
      {
        accessorKey: 'paid',
        header: 'Paid',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'remaining',
        header: 'Remaining',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'subTotal',
        header: 'SubTotal',
        size: 100,
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'supplierTotal',
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
      { accessorKey: 'createdAt', header: 'Created At', size: 100, Cell: dateFormat }
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
      accessorKey: 'passport.remarks',
      header: 'Remarks',
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
      accessorKey: 'supplierdetail.paymentway.visaFee',
      header: 'Sup - Visa Fee',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'supplierdetail.paymentway.processingFee',
      header: 'Sup - Processing Fee',
      Cell: defaultCellRenderer
    },
    // {
    //   accessorKey: 'supplierdetail.total',
    //   header: 'Sup - Visa Fee',
    //   Cell: defaultCellRenderer
    // },
    {
      accessorKey: 'visaId.destination.name',
      header: 'Destination',
      Cell: defaultCellRenderer
    },
    {
      accessorKey: 'visaId.category.name',
      header: 'Category',
      Cell: defaultCellRenderer
    },
    { accessorKey: 'visaId.type.name', header: 'Type', Cell: defaultCellRenderer },
    { accessorKey: 'visaId.duration.name', header: 'Duration', Cell: defaultCellRenderer }
  ]);

// export default useTableColumns
