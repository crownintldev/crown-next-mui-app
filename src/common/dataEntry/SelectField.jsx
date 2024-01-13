import React from 'react'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CustomTextField from 'src/@core/components/mui/text-field'

const SelectField = ({ options, label, placeholder, value, setPayMethod, disableClearable }) => {
  return (
    <CustomAutocomplete
      sx={{ mb: 4 }}
      options={options ? options : ['confirmed', 'processing']}
      id='autocomplete-size-medium'
      value={value}
      getOptionLabel={option => option || ''}
      onChange={(event, newValue) => {
        setPayMethod(newValue)
      }}
      disableClearable={disableClearable}
      renderInput={params => (
        <CustomTextField {...params} size='small' label={label} placeholder={placeholder} />
      )}
    />
  )
}

export default SelectField
