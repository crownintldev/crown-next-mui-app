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
import {
  fetchVisaCategory,
  fetchVisaDestination,
  fetchVisaDuration,
  fetchVisaType,
  fetchSupplier
} from 'src/store'

// action
import { createApi, updateApi } from 'src/action/function'

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer'
import SelectHookField from 'src/common/dataEntry/SelectHookField'

//form
import SelectField from 'src/common/dataEntry/SelectField'
import SupplierForm from 'src/common/forms/supplier/SupplierForm'
import axios from 'axios'
import { fetchActionData } from 'src/action/fetchData'

const requiredError = ['category', 'destination', 'duration', 'type', ]

const yupField = requiredError.reduce((acc, item) => {
  acc[item] = yup
    .string()
    .typeError('Field Should not be empty')
    .required('Field Should not be empty')
  
return acc
}, {})

const schema = yup.object().shape(yupField)

const defaultValues = {
  category: '',
  destination: '',
  duration: '',
  type: '',
  supplierVisaService: '',
  confirmed: {
    totalFee: ''
  },
  processing: {
    visaFee: '',
    processingFee: ''
  }
}

export const findSupplierVisa = data => {
  return axios.post(`${process.env.NEXT_PUBLIC_API}/supplier-visa-service/findSupplierVisa`, data)
}

const VisaServiceForm = ({
  toggle,
  fetchApi,
  api = 'expense',
  _id,
  stateSelector,
  removeSelection
}) => {
  const dispatch = useDispatch()
  let editId = useSelector(state => state[stateSelector]?.data?.find(item => item._id === _id))

  // ** State
  const [payMethod, setPayMethod] = useState('confirmed')
  const [supplierVisa, setSupplierVisa] = useState(null)
  const category = useSelector(state => state?.visaCategory?.data)
  const destination = useSelector(state => state?.visaDestination?.data)
  const type = useSelector(state => state?.visaType?.data)
  const duration = useSelector(state => state?.visaDuration?.data)


  useEffect(() => {
    dispatch(fetchVisaCategory({}))
    dispatch(fetchVisaDestination({}))
    dispatch(fetchVisaType({}))
    dispatch(fetchVisaDuration({}))
    dispatch(fetchSupplier({}))
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

  // find supplier visa service
  const selectDestination = watch('destination')
  const selectCategory = watch('category')
  const selectDuration = watch('duration')
  const selectType = watch('type')

  // console.log(selectDestination, selectCategory, selectDuration, selectType)

  useEffect(() => {
    if (selectDestination && selectCategory && selectDuration && selectType) {
      fetchActionData(
        () => findSupplierVisa({ destination, category, type, duration }),
        setSupplierVisa
      )
    }
  }, [selectDestination, selectCategory, selectDuration, selectType])

  useEffect(()=>{
   setValue("confirmed.totalFee",supplierVisa?.confirmed?.totalFee)
   setValue("processing.visaFee",supplierVisa?.processing?.visaFee)
   setValue("processing.processingFee",supplierVisa?.processing?.processingFee)
   setValue("supplierVisaService",supplierVisa?._id)
  },[supplierVisa])

  // -- end find supplier visa service

  // editId handle
  useEffect(() => {
    if (editId) {
      Object.keys(editId).forEach(key => {
        setValue(key, editId[key])
      })
      setValue('category', editId?.category?._id)
      setValue('type', editId?.type?._id)
      setValue('duration', editId?.duration?._id)
      setValue('destination', editId?.destination?._id)
      setValue('supplier', editId?.supplier?._id)
    } else {
      reset()
    }
  }, [setValue, editId])

  const handleClose = () => {
    toggle()
    reset()
  }

  const onSubmit = async data => {
    // console.log(data)
    if (editId) {
      updateApi({
        _id,
        api,
        data,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      })
    } else {
      createApi({
        api,
        data,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      })
    }
  }

  const choosePaymentMethod =
    payMethod === 'confirmed'
      ? [
          {
            name: 'confirmed.totalFee',
            type: 'number',
            placeholder: 'Enter Total Fee',
            label: 'Total Fee',
            value: watch('confirmed.totalFee'),
            myvalue: true
          }
        ]
      : [
          {
            name: 'processing.processingFee',
            type: 'number',
            placeholder: 'Enter Processing Fee',
            label: 'Processing Fee',
            value: watch('processing.processingFee'),
            myvalue: true
          },
          {
            name: 'processing.visaFee',
            placeholder: 'Enter Visa Fee',
            type: 'number',
            label: 'Visa Fee',
            value: watch('processing.visaFee'),
            myvalue: true
          }
        ]

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* category */}
        <SelectHookField
          control={control}
          errors={errors}
          name='category'
          showValue='name'
          options={category ?? []}
          label='Category'
          placeholder='Choose Category'
          
        />
        {/* type */}
        <SelectHookField
          control={control}
          errors={errors}
          name='type'
          options={type ?? []}
          showValue='name'
          label='Type'
          placeholder='Choose Type'
        />
        {/* duration */}
        <SelectHookField
          control={control}
          errors={errors}
          name='duration'
          options={duration ?? []}
          showValue='name'
          label='Duration'
          placeholder='Choose Duration'
        />
        {/* destination */}
        <SelectHookField
          control={control}
          errors={errors}
          name='destination'
          options={destination ?? []}
          showValue='name'
          label='Destination'
          placeholder='Choose Destination'
        />
        {/* choose Payment Field */}
        <SelectField
          options={['confirmed', 'processing']}
          label='Select Payment Method'
          placeholder={'Select Payment Method'}
          value={payMethod}
          setPayMethod={setPayMethod}
          disableClearable={true}
        />

        <CustomHookTextField
          chooseFields={choosePaymentMethod}
          control={control}
          errors={errors}
          required={true}
        />
        {/* <CustomHookTextField chooseFields={chooseFields} control={control} errors={errors} /> */}
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

export default VisaServiceForm
