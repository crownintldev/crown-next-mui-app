import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller } from 'react-hook-form'

const DatePickerHookField = ({ name, placeholder, required, control, errors }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
          format="DD-MM-YYYY"
            label={`${placeholder} ${required ? '*' : ''}`}
            inputFormat='DD/MM/YYYY'
            {...field}
            renderInput={params => (
              <TextField
                {...params}
                size='small'
                fullWidth
                error={Boolean(errors.datePicker)}
                helperText={errors.datePicker?.message}
              />
            )}
            className='inputdate'
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default DatePickerHookField
