import CustomChip from 'src/@core/components/mui/chip';
import dayjs from 'dayjs';
import { Chip } from '@mui/material';
import { currencyFormatter } from 'src/utils/helperfunction';

const statusObj = {
  booked: 'primary',
  editing: 'primary',
  pending: 'warning',
  inprocess: 'info',
  'in embassy': 'primary',
  verification: 'info',
  approved: 'success',
  returned: 'error',
  cancelled: 'error',
  delivered: 'success',
  rejected: 'error',
  trash: 'error',
  // ticket booking
  paid: 'success',
  'partial pay': 'info',
  unpaid: 'warning',
};

export const renderStatusCell = ({ cell }) => {
  const value = cell.getValue();

  return (
    statusObj.hasOwnProperty(value) && (
      <CustomChip
        rounded
        skin='light'
        size='small'
        label={value}
        color={statusObj[value]}
        sx={{ textTransform: 'capitalize' }}
      />
    )
  );
};

const capitalize = (value) => <div style={{ textTransform: 'capitalize' }}>{value}</div>;
const uppercase = (value) => <div style={{ textTransform: 'uppercase' }}>{value}</div>;

export const defaultCellRenderer = ({ row, column }) => {
  const value = column.id.split('.').reduce((acc, curr) => acc?.[curr], row.original);
  // Check if the value is not undefined and not null
  return value !== undefined && value !== null ? (
    typeof value === 'number' ? (
      currencyFormatter(value, 'PKR')
    ) : (
      uppercase(value)
    )
  ) : (
    <span style={{ color: '#ffa600ff' }}>N/A</span>
  );
};

export const defaultCellUpperCase = ({ row, column }) => {
  const value = column.id.split('.').reduce((acc, curr) => acc?.[curr], row.original);

  // Check if the value is not undefined and not null
  return value !== undefined && value !== null ? (
    uppercase(value)
  ) : (
    <span style={{ color: '#ffa600ff' }}>N/A</span>
  );
};

// For Members Only
export const conditionValue = ({ row }) => {
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
export const modelCondition = ({ cell }) => {
  const data = cell.getValue();
  return data === 'Agent' ? (
    <span style={{ border: '1px solid green' }}>Ag</span>
  ) : data === 'Client' ? (
    <span style={{ border: '1px solid purple' }}>Cl</span>
  ) : (
    data === 'Company' && <span style={{ border: '1px solid brown' }}>Co</span>
  );
};

export const dateFormat = ({ cell }) => {
  return dayjs(cell.getValue()).format('DD-MM-YYYY');
};

export const ArrayCellRenderer = ({ cell }) => {
  const data = cell.getValue();
  // console.log(data)
  return (
    <div>
      {data?.map((service) => (
        <Chip sx={{ mr: 1 }} key={service} label={service} />
      ))}
    </div>
  );
};
export const CellRowId = ({ row }) => {
  return row.index + 1;
};
