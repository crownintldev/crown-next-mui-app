import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

const DatePickerField = ({ placeholder = '', onChange = () => {}, value = null }) => {
  value = dayjs(value)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={`${placeholder}`}
        inputFormat='MM/DD/YYYY'
        className='inputdate'
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} size='small' />}
      />
    </LocalizationProvider>
  )
}

export default DatePickerField
