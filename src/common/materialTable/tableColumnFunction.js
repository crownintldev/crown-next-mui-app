import CustomChip from 'src/@core/components/mui/chip'
import dayjs from 'dayjs'
import { Chip } from '@mui/material'

const statusObj = {
  booked: 'success',
  active: 'success',
  pending: 'warning',
  inactive: 'secondary',
  inprocess: 'info'
}

export const renderStatusCell = ({ cell }) => {
  const value = cell.getValue()
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
  )
}
const capitalize = value => <div style={{ textTransform: 'capitalize' }}>{value}</div>
const uppercase = value => <div style={{ textTransform: 'uppercase' }}>{value}</div>
export const defaultCellRenderer = ({ row, column }) => {
  const value = column.id.split('.').reduce((acc, curr) => acc?.[curr], row.original)
  // Check if the value is not undefined and not null
  return value !== undefined && value !== null ? (
    capitalize(value)
  ) : (
    <span style={{ color: '#ffa600ff' }}>N/A</span>
  )
}
export const defaultCellUpperCase = ({ row, column }) => {
  const value = column.id.split('.').reduce((acc, curr) => acc?.[curr], row.original)
  // Check if the value is not undefined and not null
  return value !== undefined && value !== null ? (
    uppercase(value)
  ) : (
    <span style={{ color: '#ffa600ff' }}>N/A</span>
  )
}

export const conditionValue = ({ cell }) => {
  const data = cell.getValue()
  return data?.fullName ? capitalize(data?.fullName) : capitalize(data?.companyName)
}
export const dateFormat = ({ cell }) => {
  return dayjs(cell.getValue()).format('YYYY-MM-DD')
}

export const ArrayCellRenderer = ({ cell }) => {
  const data = cell.getValue()
  return (
    <div>
      {data.map(service => (
        <Chip sx={{ mr: 1 }} key={service} label={service} />
      ))}
    </div>
  )
}
