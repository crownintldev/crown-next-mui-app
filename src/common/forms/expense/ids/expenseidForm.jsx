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

// action
import { createApi, updateApi } from 'src/action/function'

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'
import { capitalizeSplitDash } from 'src/utils/helperfunction'

const schema = yup.object().shape({
  name: yup.string().typeError('field is required').required('required')
})

const defaultValues = {
  name: ''
}

const ExpenseidForm = ({
  toggle,
  fetchApi,
  api = 'expense',
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomHookTextField chooseFields={chooseField} control={control} errors={errors} />

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

export default ExpenseidForm
