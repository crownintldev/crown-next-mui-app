import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const MuiAutoComplete = ({
  size = 'small',
  width = 250,
  style,
  options = [],
  getOptionLabel = (option) => option,
  onChange,
  label = 'Select Item',
  id = 'autocomplete-outlined',
  renderOption,
  value
}) => {
  const autocompleteProps = {
    size,
    sx: { width, ...style },
    options,
    id,
    getOptionLabel,
    onChange,
    renderInput: (params) => <TextField {...params} label={label} />
  }

  // If value is provided, include it in the props
  if (value !== undefined) {
    autocompleteProps.value = value
  }

  return (
    <Autocomplete
      {...autocompleteProps}
      renderOption={
        renderOption ||
        ((props, option) => (
          <Box component='li' {...props}>
            {getOptionLabel((option) => option.toUpperCase())}
          </Box>
        ))
      }
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )
}

export default MuiAutoComplete
