import React, { useEffect, useState } from 'react'

// ** Third Party Imports
import * as yup from 'yup'

// ** MUI Imports
import Button from '@mui/material/Button'

import Box from '@mui/material/Box'

// yup
import { yupResolver } from '@hookform/resolvers/yup'

// hookform
import { useForm } from 'react-hook-form'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchSupplierCategory } from 'src/store'

// action
import { createApi, updateApi } from 'src/action/function'

//form
import IdNameForm from '../idnameForm/IdNameForm'

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer'
import SelectHookField from 'src/common/dataEntry/SelectHookField'

const requiredError = ['name', 'category', 'phone', 'description']

const yupField = requiredError.reduce((acc, item) => {
  acc[item] = yup
    .string()
    .typeError('Field Should not be empty')
    .required('Field Should not be empty')
  
return acc
}, {})

const schema = yup.object().shape(yupField)

const defaultValues = {
  name: '',
  category: '',
  phone: '',
  description: ''
}

const SupplierForm = ({
  toggle,
  fetchApi,
  api = 'supplier',
  _id,
  stateSelector,
  removeSelection
}) => {
  const dispatch = useDispatch()
  let editId = useSelector(state => state[stateSelector]?.data?.find(item => item._id === _id))
  const category = useSelector(state => state?.supplierCategory?.data)
  useEffect(() => {
    dispatch(fetchSupplierCategory({}))
  }, [])

  const {
    reset,
    control,
    setError,
    handleSubmit,
    getValues,
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
      Object.keys(editId).forEach(key => {
        setValue(key, editId[key])
      })
      setValue("category",editId?.category?._id)
    } else {
      reset()
    }
  }, [setValue, editId])

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

  const chooseFields = [
    {
      name: 'name',
      placeholder: `Enter  Name`,
      label: `Name`
    },
    {
      name: 'phone',
      placeholder: `Enter Phone Number`,
      label: `Phone`,
      type: 'number'
    },
    {
      name: 'description',
      placeholder: `Enter Description`,
      label: `Description`
    }
  ]

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* category */}
      <CustomOpenDrawer
          ButtonTitle='Add Supplier Category'
          drawerTitle='Add Supplier Category'
          Form={IdNameForm}
          fetchApi={fetchSupplierCategory}
          formName='Category'
          api='supplier-category'
          
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='category'
          showValue='name'
          options={category ?? []}
          label='Category'
          placeholder='Choose Category'
        />
        <CustomHookTextField chooseFields={chooseFields} control={control} errors={errors} />
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

export default SupplierForm
