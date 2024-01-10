"use client"
import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const DatePickerComponent = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DatePicker']}> */}
        <DatePicker label='Basic date picker' sx={{ width: '100%' }} />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  )
}

export default DatePickerComponent
