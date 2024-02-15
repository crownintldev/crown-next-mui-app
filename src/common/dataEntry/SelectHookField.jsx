import React from 'react'
import { Controller } from 'react-hook-form'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CustomTextField from 'src/@core/components/mui/text-field'

// ... (other imports)

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
          value={options?.find((option) => option._id === value) || null}
          onChange={(event, newValue) => {
            onChange(newValue ? newValue._id : null)
          }}
          sx={{ mb: 4 }}
          options={options && options.length > 0 ? options : []}
          id='autocomplete-size-medium'
          disableClearable={disableClearable}
          // getOptionLabel={option =>
          //   option[showValue]
          //     ? option[showValue].charAt(0).toUpperCase() + option[showValue].slice(1)
          //     : ''
          // }
          getOptionLabel={(option) =>
            option[showValue] ? option[showValue].toUpperCase() : ''
          }
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          renderInput={(params) => (
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

export default SelectHookField
