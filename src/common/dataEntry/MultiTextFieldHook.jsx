import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'

const MultiTextFieldHook = ({ getValues, setValue, control }) => {
  const addService = () => {
    const currentServices = getValues('services')
    setValue('services', [...currentServices, ''])
  }

  const removeService = index => {
    const currentServices = getValues('services')
    const updatedServices = currentServices.filter((_, i) => i !== index)
    setValue('services', updatedServices)
  }


  // console.log(getValues('services'))
  const handleChange = (event, index) => {
    const { value } = event.target
    const updatedServices = getValues('services')
    updatedServices[index] = value
    console.log(index)
    setValue('services', updatedServices);
  }
  console.log(getValues('services'))
  
return (
    <div>
      Services
      {getValues('services').map((service, index) => (
        <Box key={index} sx={{ display: 'flex', mb: 4 }}>
          <Controller
            name={service}
            control={control}
            defaultValue={service} // Ensure this is the correct initial value
            render={({ field }) => {
              // console.log(field.value,service) // Debugging line
              return (
                <CustomTextField
                  {...field}
                  value={field.value ? field.value : service}
                  onChange={(event) =>handleChange(event,index)}
                  placeholder={`Service ${index + 1}`}
                  InputLabelProps={{ shrink: true }}
                  required={true}
                  sx={{ mt: 2 }}
                />
              )
            }}
          />
          <Box sx={{ display: 'flex' }}>
            <Button onClick={addService} sx={{ fontSize: '1.5em' }}>
              +
            </Button>
            {index !== 0 && (
              <Button sx={{ fontSize: '1.5em' }} onClick={() => removeService(index)}>
                -
              </Button>
            )}
          </Box>
        </Box>
      ))}
    </div>
  )
}

export default MultiTextFieldHook
