import React from 'react'
import { Controller } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { capitalizeCamelSpace, capitalizeValue } from 'src/utils/helperfunction'
import { MuiTextAreaHookField } from './MuiTextAreaHookField'

const CustomHookTextField = ({ chooseFields, control, errors, item }) => {
  // function textfield
  const textField = (item) => {
    const {
      textarea,
      rows,
      name,
      label,
      required,
      placeholder,
      type,
      value: myValue,
      myvalue
    } = item

    const formatPassportNumber = (value) => {
      if (value.length <= 2) {
        return value.toUpperCase() // Convert the first two characters to uppercase
      } else {
        // If value is longer than 2 characters and doesn't already have a dash
        if (value.length > 2 && value[2] !== '-') {
          const letters = value.slice(0, 2).toUpperCase() // Get first two characters
          const rest = value.slice(2)
          return `${letters}-${rest}` // Insert dash after the first two characters
        }
        return value
      }
    }

    const handleOnChange = (item, onChange) => (event) => {
      let value = event.target.value
      if (item.name === 'passportNumber') {
        value = formatPassportNumber(value)
      }
      onChange(value)
    }

    return (
      <>
        {/* {textarea ? (
          <MuiTextAreaHookField
            control={control}
            errors={errors}
            name={name}
            placeholder={placeholder}
            rows={rows}
          />
        ) : ( */}
        <Controller
          // key={name}
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              required={required}
              fullWidth
              type={type ? type : 'text'}
              value={
                myvalue
                  ? myValue === undefined
                    ? ''
                    : myValue
                  : value !== undefined
                  ? capitalizeValue(value)
                  : ''
              }
              sx={{ mb: 4 }}
              label={label ? label : capitalizeCamelSpace(name)}
              // onChange={onChange}
              onChange={handleOnChange(item, onChange)}
              placeholder={
                placeholder ? placeholder : `Enter ${capitalizeCamelSpace(name)}`
              }
              error={Boolean(errors[name])}
              helperText={errors[name]?.message || ''}
            />
          )}
        />
        {/* )} */}
      </>
    )
  }

  return (
    <>
      {chooseFields
        ? chooseFields.map((item) => {
            return textField(item)
          })
        : textField(item)}
    </>
  )
}

export default CustomHookTextField
