import React from 'react'
import { Controller } from 'react-hook-form'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CustomTextField from 'src/@core/components/mui/text-field'

const SelectHookField = ({
  errors,
  control,
  name,
  options,
  label,
  placeholder,
  disableClearable,
  showValue
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <CustomAutocomplete
          {...field}
          value={(options && options?.find(option => option._id === value)) || ''}
          onChange={(event, newValue) => {
            onChange(newValue ? newValue._id : '')
          }}
          sx={{ mb: 4 }}
          options={options && options.length > 0 ? options : []}
          id='autocomplete-size-medium'
          disableClearable={disableClearable}
          getOptionLabel={option => option[showValue] || ''}
          renderInput={params => (
            <CustomTextField
              {...params}
              size='small'
              label={label}
              placeholder={placeholder}
              error={Boolean(errors && errors[name])}
              helperText={errors ? errors[name]?.message : null}
              // helperText={errors ? errors[name].message : null} // Display the error message
            />
          )}
        />
      )}
    />
  )
}

export default SelectHookField
