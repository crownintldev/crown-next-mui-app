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
import { fetchExpense } from 'src/store'
import { fetchExpenseCategory, fetchExpenseType } from 'src/store'

// action
import { createApi, updateApi } from 'src/action/function'

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer'
import SelectHookField from 'src/common/dataEntry/SelectHookField'

//form
import ExpenseidForm from './ids/expenseidForm'

const schema = yup.object().shape({
  title: yup.string().required('required'),
  title: yup.string().typeError('Title is required').required('required'),
  category: yup.string().typeError('Category is required').required('required')
})

const defaultValues = {
  title: '',
  type: '',
  category: '',
  price: '',
  description: '',
  files: []
}

const ExpenseForm = ({
  toggle,
  fetchApi,
  api = 'expense',
  _id,
  stateSelector,
  removeSelection
}) => {
  const dispatch = useDispatch()
  let editId = useSelector(state => state[stateSelector]?.data?.find(item => item._id === _id))

  const category = useSelector(state => state?.expenseCategory?.data)
  const type = useSelector(state => state?.expenseType?.data)

  // console.log(type)
  useEffect(() => {
    dispatch(fetchExpenseCategory({}))
    dispatch(fetchExpenseType({}))
  }, [dispatch])

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
    } else {
      reset()
    }
  }, [setValue, editId])

  const handleClose = () => {
    toggle()
    reset()
    removeSelection()
  }

 //************************** */ onSubmit
  const onSubmit = async data => {
    let formData = new FormData()
    Object.keys(data).forEach(key => {
      if (key !== 'files') {
        formData.append(key, data[key])
      }
    })
    data?.files?.forEach(file => {
      formData.append('files', file)
    })

    // const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/${api}/create`, formData)
    if (editId) {
      updateApi({
        _id,
        api,
        data: formData,
        dispatch,
        fetchData: fetchExpense,
        toggle,
        reset,
        removeSelection
      })
    } else {
      createApi({
        api,
        data: formData,
        dispatch,
        fetchData: fetchExpense,
        toggle,
        reset,
        removeSelection
      })
    }
  }

  const chooseFields = [
    {
      name: 'title',
      placeholder: `Enter Title`,
      label: `Title`
    },
    {
      name: 'price',
      placeholder: `Enter Price`,
      label: `Price`,
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
        <CustomOpenDrawer
          ButtonTitle='Add Category'
          drawerTitle='Add Category Form'
          Form={ExpenseidForm}
          fetchApi={fetchExpenseCategory}
          formName='Type'
          api='expense-category'
        />
        <SelectHookField
          control={control}
          name='category'
          showValue='name'
          options={category ?? []}
          label='Category'
          placeholder='Enter Category'
        />
        <CustomOpenDrawer
          ButtonTitle='Add Type'
          drawerTitle='Add Type Form'
          Form={ExpenseidForm}
          fetchApi={fetchExpenseType}
          formName='Type'
          api='expense-type'
        />
        <SelectHookField
          control={control}
          name='type'
          options={type ?? []}
          showValue='name'
          label='Type'
          placeholder='Enter Type'
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

export default ExpenseForm
