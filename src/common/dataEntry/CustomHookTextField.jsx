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
      myvalue,
      disabled
    } = item
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
          render={({ field: { value, onChange } }) => { 
           return <CustomTextField
              required={required}
              fullWidth
              type={type ? type : 'text'}
              value={
                myvalue
                  ? myValue === undefined
                    ? ''
                    : myValue
                  : value !== undefined
                  ? typeof value === "number" || name ==="password"
                    ? value
                    : value?.toUpperCase()
                  : ''
              }
              sx={{ mb: 4 }}
              label={label ? label : capitalizeCamelSpace(name)}
              onChange={onChange}
              disabled={disabled}
              placeholder={
                placeholder ? placeholder : `Enter ${capitalizeCamelSpace(name)}`
              }
              error={Boolean(errors[name])}
              helperText={errors[name]?.message || ''}
            />
          }}
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
