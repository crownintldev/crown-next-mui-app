import React from 'react'
import { Controller } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { capitalizeCamelSpace, capitalizeValue } from 'src/utils/helperfunction'

const CustomHookTextField = ({ chooseFields, control, errors, required, item }) => {
  // function textfield
  const textField = item => {
    const { name, label, placeholder, type, value: myValue, myvalue } = item

    return (
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
            onChange={onChange}
            placeholder={placeholder ? placeholder : `Enter ${capitalizeCamelSpace(name)}`}
            error={Boolean(errors[name])}
            helperText={errors[name]?.message || ''}
          />
        )}
      />
    )
  }

  return (
    <>
      {chooseFields
        ? chooseFields.map(item => {
            return textField(item)
          })
        : textField(item)}
    </>
  )
}

export default CustomHookTextField
