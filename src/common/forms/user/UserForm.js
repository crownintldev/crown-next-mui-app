import React, { useEffect, useState } from 'react'

// ** Third Party Imports
import * as yup from 'yup'

// ** MUI Imports
import Button from '@mui/material/Button'

import Box from '@mui/material/Box'

// yup
import { yupResolver } from '@hookform/resolvers/yup'

// hookform
import { Controller, useForm } from 'react-hook-form'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchRole, fetchBranch } from 'src/store'

// action
import { createApi, updateManyApi } from 'src/action/function'

//form
import { AuthApi } from 'config'

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer'
import SelectHookField from 'src/common/dataEntry/SelectHookField'
import CustomTextField from 'src/@core/components/mui/text-field'
import MenuItem from '@mui/material/MenuItem'
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField'

//custom vuexy select style
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const requiredError = ['']

const yupField = requiredError.reduce((acc, item) => {
  acc[item] = yup
    .string()
    .typeError('Field Should not be empty')
    .required('Field Should not be empty')

  return acc
}, {})

const schema = yup.object().shape(yupField)

const defaultValues = {
  ids: [],
  roles: '',
  appPermissions: ['account'],
  status: '',
  password: '',
  username:'',
  email:'',
  password:''
}

const UserForm = ({
  toggle,
  fetchApi,
  api,
  _id: ids,
  stateSelector,
  removeSelection
}) => {
  const dispatch = useDispatch()
  let roles = useSelector((state) => state?.role?.data)
  let branches = useSelector((state) => state?.branch?.data)

  const editIds = useSelector(
    (state) =>
      ids &&
      ids.length > 0 &&
      ids
        .map((id) => state?.user?.data.find((item) => item?._id === id))
        .map((item) => {
          return {
            email: item.email,
            roles: item?.roles?._id,
            status: item?.status,
            appPermissions: item?.appPermissions,
            _id: item?._id
          }
        })
  )
  // console.log(editIds)

  useEffect(() => {
    dispatch(fetchRole({}))
    dispatch(fetchBranch({}))
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
    if (ids.length === 1) {
      setValue('roles', editIds[0].roles)
      setValue('status', editIds[0].status)
      setValue('ids', ids)
    } else if (ids.length > 1) {
      setValue('ids', ids)
    } else {
      reset()
    }
  }, [setValue, ids])

  const handleClose = () => {
    toggle()
    reset()
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (editIds && ids && ids.length>0) {
      updateManyApi({
        completeApi: 'user/editUserbyAdministrator',
        apidomain: AuthApi,
        data: getValues(),
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      })
    }else{
      createApi({ completeApi:"auth/signup",apidomain: AuthApi,   data: getValues(), dispatch, fetchData: fetchApi, toggle, reset })
    }
  }

  const userFields = [
    {
      name: 'username',
      placeholder: `Enter Username`,
      label: `Username`,
      required: true
    },
    {
      name: 'email',
      placeholder: `Enter Email`,
      label: `Email`,
      required: true
    }
  ]

  const passwordField = [
    ids && ids.length
      ? {
          name: 'password',
          placeholder: `Enter Password **Not Required`,
          label: `User Password Change`
        }
      : {
          name: 'password',
          placeholder: `Enter Password`,
          label: `Password`,
          required: true
        }
  ]
  const renderSelectedValue = (selectedIds) => {
    return selectedIds
      ?.map((id) => {
        const item = editIds.find((item) => item._id === id)

        return item ? `${item.email}` : ''
      })
      .filter(Boolean) // Removes any undefined or empty values
      .join(', ')
  }

  return (
    <form>
      {ids && ids.length > 0 ? (
        <Controller
          name='ids'
          control={control}
          render={({ field }) => (
            <CustomTextField
              sx={{ mb: 6 }}
              select
              fullWidth
              label='Users Selected'
              id='select-multiple-checkbox'
              SelectProps={{
                MenuProps,
                displayEmpty: true,
                multiple: true,
                value: field.value,
                onChange: field.onChange,
                renderValue: renderSelectedValue
              }}
            >
              <MenuItem value='' disabled>
                Select Users
              </MenuItem>
              {editIds &&
                editIds.length > 0 &&
                editIds.map((item, index) => (
                  <MenuItem key={index} value={`${item._id}`}>
                    {`${item.email}`}
                  </MenuItem>
                ))}
            </CustomTextField>
          )}
        />
      ) : (
        <CustomHookTextField
          chooseFields={userFields}
          control={control}
          errors={errors}
        />
      )}
      <CustomHookTextField
        chooseFields={passwordField}
        control={control}
        errors={errors}
      />
      <SelectHookField
        control={control}
        errors={errors}
        name='roles'
        showValue='title'
        options={roles ?? []}
        label='Role'
        placeholder='Choose Roles'
      />
      <SelectHookField
        control={control}
        errors={errors}
        name='branch'
        showValue='name'
        options={branches ?? []}
        label='Branch'
        placeholder='Choose Branch'
      />
      <SimpleSelectHookField
        control={control}
        errors={errors}
        name='status'
        options={['pending', 'active', 'block']}
        label='Status'
        placeholder='select Status'
      />

      <Controller
        name='appPermissions'
        control={control}
        render={({ field }) => (
          <CustomTextField
            sx={{ mb: 6 }}
            select
            fullWidth
            label='Apps Selected'
            id='select-multiple-checkbox'
            SelectProps={{
              MenuProps,
              displayEmpty: true,
              multiple: true,
              value: field.value,
              onChange: field.onChange
            }}
          >
            <MenuItem value='account' disabled>
              Account
            </MenuItem>
          </CustomTextField>
        )}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button color='primary' variant='contained' sx={{ mr: 3 }} onClick={onSubmit}>
          Submit
        </Button>
        <Button variant='tonal' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </form>
  )
}

export default UserForm
