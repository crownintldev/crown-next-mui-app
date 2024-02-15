import CustomChip from 'src/@core/components/mui/chip'
import dayjs from 'dayjs'
import { Chip } from '@mui/material'
import { currencyFormatter } from 'src/utils/helperfunction'

const statusObj = {
  booked: 'success',
  pending: 'warning',
  rejected: 'error',
  inprocess: 'info',
  verification:"info",
  approved:'success',
  returned:"error",
  cancelled:'error',
  paid:'success',
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

const capitalize = (value) => <div style={{ textTransform: 'capitalize' }}>{value}</div>
const uppercase = (value) => <div style={{ textTransform: 'uppercase' }}>{value}</div>

export const defaultCellRenderer = ({ row, column }) => {
  const value = column.id.split('.').reduce((acc, curr) => acc?.[curr], row.original)
  // Check if the value is not undefined and not null
  return value !== undefined && value !== null ? (
    typeof value === 'number' ? (
      currencyFormatter(value, 'PKR')
    ) : (
      uppercase(value)
    )
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

// For Members Only
export const conditionValue = ({ cell }) => {
  const data = cell.getValue()
  return data?.fullName ? uppercase(data?.fullName) : uppercase(data?.companyName)
}
export const modelCondition=({cell})=>{
  const data = cell.getValue();
  return data === "Agent"? <span style={{border:"1px solid green"}}>Ag</span> : data === "Client" ? <span style={{border:"1px solid purple"}}>Cl</span> : data === "Company" && <span style={{border:"1px solid brown"}}>Co</span>
}



export const dateFormat = ({ cell }) => {
  return dayjs(cell.getValue()).format('YYYY-MM-DD')
}

export const ArrayCellRenderer = ({ cell }) => {
  const data = cell.getValue()
  // console.log(data)
  return (
    <div>
      {data?.map((service) => (
        <Chip sx={{ mr: 1 }} key={service} label={service} />
      ))}
    </div>
  )
}
export const CellRowId = ({ row }) => {
  return row.index + 1
}
