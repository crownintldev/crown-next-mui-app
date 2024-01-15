import React from 'react'
import { Controller } from 'react-hook-form'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CustomTextField from 'src/@core/components/mui/text-field'

const SimpleSelectHookField = ({
  control,
  errors,
  name,
  options,
  label,
  placeholder,
  disableClearable
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <CustomAutocomplete
          {...field}
          sx={{ mb: 4 }}
          options={options ? options : ['confirmed', 'processing']}
          id='autocomplete-size-medium'
          value={value || null} 
          getOptionLabel={(option) => option || ''}
          isOptionEqualToValue={(option, value) => option === value}
          onChange={(event, newValue) => {
            onChange(newValue)
          }}
          disableClearable={disableClearable || false}
          renderInput={params => (
            <CustomTextField
              {...params}
              size='small'
              label={label}
              placeholder={placeholder}
              error={Boolean(errors && errors[name])}
              helperText={errors ? errors[name]?.message : null}
            />
          )}
        />
      )}
    />
  )
}

export default SimpleSelectHookField
