import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
// ** MUI Imports
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** helper function
import {
  capitalizeValue,
  capitalizeCamelSpace,
  capitalizeSplitDash
} from 'src/utils/helperfunction'

//get by data
import axios from 'axios'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createApi, updateApi } from 'src/action/function'


const schema = yup.object().shape({
  name: yup.string().required('category is required')
})

const defaultValues = {
  name: ''
}

// ------------------Passport Form-----------------------
const VisaServiceIdForm = ({
  toggle,
  fetchApi,
  api = 'visa-category',
  _id,
  stateSelector,
  removeSelection
}) => {
  const dispatch = useDispatch()
  let editId = useSelector(state => state[stateSelector]?.data?.find(item => item._id === _id))

  const {
    reset,
    control,
    setError,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (editId) {
      setValue('name', editId.name)
    } else {
      reset()
    }
  }, [setValue, editId])

  // close on close button
  const handleClose = () => {
    toggle()
    reset()
  }

  const onSubmit = async data => {
    if (editId) {
      updateApi({ _id, api, data, dispatch, fetchData: fetchApi, toggle, reset, removeSelection })
    } else {
      createApi({ api, data, dispatch, fetchData: fetchApi, toggle, reset, removeSelection })
    }
  }

  const chooseField = [
    {
      name: 'name',
      placeholder: `Enter ${capitalizeSplitDash(api)} Name`,
      label: `${capitalizeSplitDash(api)} Name`
    }
  ]

  const myField = [...chooseField]

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {myField.map(item => {
          const { name, label, placeholder, type } = item
          return (
            <>
              <Controller
                key={name}
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type={type ? type : 'text'}
                    value={capitalizeValue(value)}
                    sx={{ mb: 4 }}
                    label={label ? label : capitalizeCamelSpace(name)}
                    onChange={onChange}
                    placeholder={placeholder ? placeholder : `Enter ${capitalizeCamelSpace(name)}`}
                    error={Boolean(errors[name])}
                    helperText={errors[name]?.message || ''}
                  />
                )}
              />
            </>
          )
        })}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type='submit' variant='contained' sx={{ mr: 3 }}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default VisaServiceIdForm
