import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { getCookie } from 'src/action/auth-action'

// ** MUI Imports
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/account'

//helper function
import { axiosErrorMessage, isAllSameinArray } from 'src/utils/helperfunction'

//get by data
import axios from 'axios'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Typography } from '@mui/material'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

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

const schema = yup.object().shape({
  accountIds: yup.array().of(yup.string()).required('Passports are required.')

  // visaBookingIds: yup.array().of(yup.string()).required('Visa booking IDs are required.'),
  // visaId: yup.string().required('Visa ID is required.'),
  // status: yup.string().required('Status is required.')
})

const defaultValues = {
  accountIds: [],
  paid: 0,
  total: 0,
  discount: 0
}

// ------------------visaBooking Form-----------------------
const EditAccountForm = ({ toggle, _id: ids, removeSelection }) => {
  const theme = useTheme()
  const accessToken = getCookie('jwt')
  // ** State
  const dispatch = useDispatch()

  const accountItems = useSelector(state =>
    ids
      .map(id => state.account.data.length > 0 && state.account.data.find(item => item._id === id))
      .map(item => {
        return {
          visaBookingDetails: item?.visaBookingIds?.map(visaBooking => ({
            passportNumber: visaBooking.passportId?.passportNumber,
            givenName: visaBooking.passportId?.givenName
          })),
          amount: item?.amount,
          _id: item?._id,
          ReferName: item?.by?.fullName ? item?.by?.fullName : item?.by?.companyName,
          onModel: item?.onModel
        }
      })
  )
  const testValidityRefer = isAllSameinArray(accountItems, 'ReferName')

  // console.log('account item', accountItems)

  const {
    reset,
    control,
    setError,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const [amount, setAmount] = useState({
    total: 0,
    paid: 0
  })

  const handleAmountChange = event => {
    const { name, value: newValue } = event.target
    setAmount({ ...amount, [name]: newValue })
  }
  const totalAmount = Number(watch('total'))
  const paidAmount = Number(watch('paid'))
  const discountAmount = watch('discount') ? Number(watch('discount')) : 0

  const amountRemaining = totalAmount - (paidAmount + discountAmount)

  // console.log('reming data', paidAmount, discountAmount, typeof paidAmount, typeof discountAmount)
  useEffect(() => {
    if (ids.length > 0) {
      setValue('accountIds', ids)

      const data = accountItems.reduce(
        (acc, item) => {
          acc.totalAmount += item.amount.total
          acc.paidAmount += item.amount.paid
          acc.discount += item.amount.discount

          return acc
        },
        { totalAmount: 0, paidAmount: 0, remainingAmount: 0, discount: 0 }
      )

      // console.log('data', data)
      setValue('paid', data.paidAmount)
      setValue('total', data.totalAmount)
      setValue('discount', data.discount)
    }
  }, [ids, setValue])

  const handleClose = () => {
    toggle()
    reset()
  }

  const onSubmit = async data => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/account/update`, data,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (response) {
        dispatch(
          fetchData({
            limit: 20,
            page: 1
          })
        )
        toggle()
        reset()
        removeSelection()
        toast.success('Update Successfully', { position: 'top-center' })
      }
      console.log(response)
    } catch (error) {
      console.log(axiosErrorMessage(error))
      toast.error(axiosErrorMessage(error), { position: 'top-center' })
    }
  }

  const renderSelectedValue = selectedIds => {
    return selectedIds
      .map(id => {
        const item = accountItems.find(item => item._id === id)

        return item ? item.visaBookingDetails.map((item, index) => `${item.passportNumber} `) : ''
      })
      .filter(Boolean) // Removes any undefined or empty values
      .join(', ')
  }

  return (
    <div>
      {!testValidityRefer ? (
        <Typography variant='h1' component='h2' color={'error'}>
          Error: Should be Same Refer
        </Typography>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='accountIds'
            control={control}
            render={({ field }) => (
              <CustomTextField
                sx={{ mb: 6 }}
                select
                fullWidth
                label='Passport Selected'
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
                  Select Passport
                </MenuItem>
                {accountItems.map((item, index) => (
                  <MenuItem key={index} value={`${item._id}`} className='!overflow-auto'>
                    {item.visaBookingDetails &&
                      item.visaBookingDetails.length > 0 &&
                      item.visaBookingDetails.map((item, index) => `${item.passportNumber} `)}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <CustomTextField
            fullWidth
            type={'text'}
            value={accountItems[0]?.onModel}
            sx={{ mb: 4 }}
            label={'Refer Category'}
            disabled
          />
          <CustomTextField
            fullWidth
            type={'text'}
            value={accountItems[0]?.ReferName}
            sx={{ mb: 4 }}
            label={'Refer Name'}
            disabled
          />

          <Controller
            name='total'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={field.value} // Use field.value from 'react-hook-form'
                sx={{ mb: 4 }}
                label='Total Amount'
                onChange={e => {
                  field.onChange(e)
                  handleAmountChange(e) // Call your custom handler
                }}
                placeholder='Enter Total Amount'
              />
            )}
          />
          <Controller
            name='paid'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={field.value} // Use field.value from 'react-hook-form'
                sx={{ mb: 4 }}
                label='Paid Amount'
                onChange={e => {
                  field.onChange(e)
                  handleAmountChange(e) // Call your custom handler
                }}
                placeholder='Enter Paid Amount'
              />
            )}
          />
          <Controller
            name={'discount'}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                type={'number'}
                value={field.value}
                sx={{ mb: 4 }}
                label={'Discount Amount'}
                placeholder={'Enter Discount Amount'}
              />
            )}
          />
          <Controller
            name={'remaining'}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                disabled
                fullWidth
                type={'number'}
                value={amountRemaining}
                sx={{ mb: 4 }}
                label={'Remaining Amount'}
                placeholder={'Enter Remaining Amount'}
              />
            )}
          />

          {/* {accountField.map((item: any) => {
          const { name, label, placeholder, type } = item
          return (
            <Controller
              key={name}
              name={name}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  type={type ? type : 'text'}
                  value={value}
                  sx={{ mb: 4 }}
                  label={label ? label : capitalizeCamelSpace(name)}
                  onChange={onChange}
                  placeholder={placeholder ? placeholder : `Enter ${capitalizeCamelSpace(name)}`}
                  error={Boolean(errors[name as keyof typeof defaultValues])}
                  helperText={(errors[name as keyof typeof defaultValues]?.message as string) || ''}
                />
              )}
            />
          )
        })} */}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' color='primary' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </div>
  )
}

export default EditAccountForm
