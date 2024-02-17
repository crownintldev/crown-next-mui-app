import React, { useEffect, useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles'

// ** MUI Imports
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import { Box, Radio, Grid, Typography } from '@mui/material'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchVisaBooking } from 'src/store'

import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import { SelectChangeEvent } from '@mui/material/Select'
import FormDrawer from 'src/common/drawer/FormDrawer'
import VisaServiceForm from '../../services/visaService/VisaServiceForm'
import { capitalizeValue } from 'src/utils/helperfunction'

import { fetchVisaService } from 'src/store'

//get by data
import axiosInstance from 'src/utils/axiosInstance'
import { listVisaCategory } from 'src/action/visaIdSelector/visaCategory'
import { listVisaDestination } from 'src/action/visaIdSelector/visaDestination'
import { listVisaDuration } from 'src/action/visaIdSelector/visaDuration'
import { listVisaType } from 'src/action/visaIdSelector/visaType'
import { findVisaId } from 'src/action/visaService'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// action function common
import toast from 'react-hot-toast'
import { fetchActionData } from 'src/action/fetchData'
import { axiosErrorMessage } from 'src/utils/helperfunction'
import {
  fetchVisaCategory,
  fetchVisaDestination,
  fetchVisaDuration,
  fetchVisaType
} from 'src/store'

const schema = yup.object().shape({
  visaBookingIds: yup.array().of(yup.string()).required('Visa booking IDs are required.'),
  status: yup.string().required('Status is required.')
})

//custom vuexy select style
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

// reuse function
import { removeUndefined } from 'src/utils/helperfunction'
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField'
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const defaultValues = {
  visaBookingIds: [],
  visaId: '',
  confirmed: '',
  processing: '',
  status: 'booked'
}

const statusList = [
  'pending',
  'booked',
  'inprocess',
  'verification',
  'in Embassy',
  'approved',
  'rejected',
  'returned',
  'cancelled',
  'delivered'
]

// ------------------visaBooking Form-----------------------
const EditVisaBookingForm = ({ toggle, _id: ids, removeSelection, setFormSize }) => {
  useEffect(() => {
    setFormSize(400)
  }, [])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  // ** State
  const [selectedValue, setSelectedValue] = useState('')
  const [visa, setVisa] = useState('')
  const [loading, setLoading] = useState(false)
  const [manuallyAmount, setManuallyAmount] = useState(false)

  //dispatch
  const dispatch = useDispatch()

  const visaBookingItems = useSelector(
    (state) =>
      ids &&
      ids.length > 0 &&
      ids
        .map((id) => state?.visaBooking?.data.find((item) => item?._id === id))
        .map((item) => {
          return {
            passportNumber: item?.passport?.passportNumber,
            status: item?.status,
            givenName: item?.passport?.givenName,
            _id: item?._id,
            visa: item.visa,
            processing: item.processing,
            confirmed: item.confirmed
          }
        })
  )

  // use selector of visa-ids
  const destination = useSelector((state) => state.visaDestination.data)
  const category = useSelector((state) => state.visaCategory.data)
  const duration = useSelector((state) => state.visaDuration.data)
  const type = useSelector((state) => state.visaType.data)

  const [findVisa, setFindVisa] = useState({
    destination: '',
    category: '',
    type: '',
    duration: ''
  })

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  useEffect(() => {
    dispatch(fetchVisaCategory({}))
    dispatch(fetchVisaDestination({}))
    dispatch(fetchVisaDuration({}))
    dispatch(fetchVisaType({}))
  }, [])
  useEffect(() => {
    const { destination, category, duration, type } = findVisa
    if (destination && category && type && duration) {
      const getVisa = async () => {
        try {
          setLoading(true)
          const res = await findVisaId({ destination, category, type, duration })
          setVisa(res.data.data)
          setLoading(false)
        } catch (err) {
          setLoading(false)
          console.log(err)
        }
      }
      getVisa()
    }
  }, [findVisa])
  // console.log(visaBookingItems)
  const {
    reset,
    control,
    setError,
    handleSubmit,
    setValue,
    getValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  // edit ids
  useEffect(() => {
    setValue('visaBookingIds', ids)
    if (ids.length === 1) {
      setValue('status', visaBookingItems[0].status)
      if (visaBookingItems[0]?.visa) {
        let { destination, duration, category, type } = visaBookingItems[0].visa
        setFindVisa({
          destination: destination?._id,
          duration: duration?._id,
          category: category?._id,
          type: type?._id
        })
        if (visaBookingItems[0]?.processing) {
          setValue('confirmed', undefined)
          setValue('paymentType', 'processing')
        } else if (visaBookingItems[0]?.confirmed) {
          setValue('processing', undefined)
          setValue('paymentType', 'confirmed')
        }
        setValue('visaId', visa._id)
      }
    } else if (ids.length > 1) {
      setValue('status', 'booked')
      if (visa && visa.length === 0) {
        setValue('visaId', '')
      }
      // if (visa._id) {
      // }
    }
  }, [ids, setValue])

  const handleClose = () => {
    if (removeSelection) {
      removeSelection()
    }
    setFindVisa({
      destination: '',
      category: '',
      type: '',
      duration: ''
    })
    toggle()
    reset()
  }

  const paymentType = watch('paymentType')
  // onSubmit
  const onSubmit = async (data) => {
    if (!visa._id) {
      return toast.error('add Visa Must', { position: 'top-center' })
    }
    setValue('visaId', visa._id)

    if (paymentType === 'confirmed') {
      if (!manuallyAmount) {
        setValue('confirmed', visa.confirmed)
      }
      setValue('processing', undefined)
    }
    if (paymentType === 'processing') {
      if (!manuallyAmount) {
        setValue('processing', visa.processing)
      }
      setValue('confirmed', undefined)
    }
    removeUndefined(data)
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API}/visa-booking/update`,
        data
      )
      // console.log(response)
      if (response) {
        dispatch(fetchVisaBooking({ updateData: response.data.data }))
        setFindVisa({
          destination: '',
          category: '',
          type: '',
          duration: ''
        })
        toggle()
        reset()
        if (removeSelection) {
          removeSelection()
        }
      }

      // console.log(response)
      toast.success('Update Successfully', { position: 'top-center' })
    } catch (err) {
      console.log(err)
      console.log(axiosErrorMessage(err))
      toast.error(axiosErrorMessage(err), { position: 'top-center' })
    }
  }

  const renderSelectedValue = (selectedIds) => {
    return selectedIds
      .map((id) => {
        const item = visaBookingItems.find((item) => item._id === id)

        return item ? `${item.passportNumber} ${item.givenName}` : ''
      })
      .filter(Boolean) // Removes any undefined or empty values
      .join(', ')
  }

  const manuallyAmountFields = manuallyAmount
    ? paymentType === 'confirmed'
      ? [
          {
            name: 'confirmed.totalFee',
            type: 'number',
            placeholder: 'Enter Total Fee',
            label: 'Confirmed - Total Fee',
            value: watch('confirmed.totalFee'),
            myvalue: true
          }
        ]
      : [
          {
            name: 'processing.processingFee',
            type: 'number',
            placeholder: 'Enter Processing Fee',
            label: 'Processing - Processing Fee',
            value: watch('processing.processingFee'),
            myvalue: true
          },
          {
            name: 'processing.visaFee',
            placeholder: 'Enter Visa Fee',
            type: 'number',
            label: 'Processing - Visa Fee',
            value: watch('processing.visaFee'),
            myvalue: true
          }
        ]
    : []

  const selectVisaId = () => {
    if (!visa) {
      return (
        <Box sx={{ pb: 4 }}>
          <Typography variant='p' color='error' sx={{ fontSize: '0.7em' }}>
            Not Found Visa Service
          </Typography>
          <br />
          <Button
            variant='contained'
            size='small'
            color='secondary'
            onClick={() => setDrawerOpen(true)}
          >
            Add Visa Service
          </Button>
        </Box>
      )
    }

    return (
      <Box sx={{ mb: 2 }}>
        {!manuallyAmount ? (
          <Grid container spacing={2}>
            {['confirmed', 'processing'].map(
              (type) =>
                visa[type] && (
                  <Grid item key={type}>
                    <Controller
                      name='paymentType'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Box
                          sx={{
                            border: 1,
                            borderColor: 'grey.700',
                            p: 2,
                            height: '7rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Radio
                            checked={value === type}
                            onChange={() => onChange(type)}
                            value={type}
                            name='radio-buttons'
                            inputProps={{ 'aria-label': type }}
                          />
                          <div>
                            <Typography
                              variant='h6'
                              component='h4'
                              sx={{ fontWeight: 'bold', mb: '4px' }}
                            >
                              {type === 'confirmed' ? 'Confirmed Fee' : 'Processing Fee:'}
                            </Typography>
                            <span>
                              &nbsp;
                              {type === 'confirmed'
                                ? `Total Fee: ${visa.confirmed.totalFee}`
                                : `Processing Fee: ${visa.processing.processingFee}`}
                            </span>
                            {type === 'processing' && <br />}
                            {type === 'processing' && (
                              <span>&nbsp;Visa Fee: {visa.processing.visaFee}</span>
                            )}
                          </div>
                        </Box>
                      )}
                    />
                  </Grid>
                )
            )}
          </Grid>
        ) : (
          <CustomHookTextField
            chooseFields={manuallyAmountFields}
            control={control}
            errors={errors}
            required={true}
          />
        )}

        <p
          onClick={() => setManuallyAmount(!manuallyAmount)}
          style={{
            textDecoration: 'underline',
            color: 'blue',
            padding: '10px 0',
            cursor: 'pointer'
          }}
        >
          {manuallyAmount ? 'or Choose Selected Amount' : 'or Enter Amount Manually'}
        </p>
      </Box>
    )
  }

  return (
    <div>
      <FormDrawer
        open={drawerOpen}
        toggle={toggleDrawer}
        drawerTitle={'Add Visa Service'}
        Form={VisaServiceForm}
        anchor='left'
        fetchApi={fetchVisaService}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='visaBookingIds'
          control={control}
          render={({ field }) => (
            <CustomTextField
              sx={{ mb: 6 }}
              select
              fullWidth
              label='Passport Selected'
              id='select-multiple-checkbox'
              InputProps={{
                style: {
                  textTransform: 'uppercase'
                }
              }}
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
                SELECT PASSPORT
              </MenuItem>
              {visaBookingItems &&
                visaBookingItems.length > 0 &&
                visaBookingItems.map((item, index) => (
                  <MenuItem key={index} value={`${item._id}`}>
                    {`${item.passportNumber.toUpperCase()} ${item.givenName.toUpperCase()}`}
                  </MenuItem>
                ))}
            </CustomTextField>
          )}
        />
        <SimpleSelectHookField
          control={control}
          errors={errors}
          name={'status'}
          options={statusList}
          label={'Status'}
          placeholder='Select a Status'
        />

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Destination'
          SelectProps={{
            value: findVisa.destination ?? '',
            displayEmpty: true,
            onChange: (e) => setFindVisa({ ...findVisa, destination: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a destination
          </MenuItem>
          {destination?.length > 0 &&
            destination.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name.toUpperCase()}
              </MenuItem>
            ))}
        </CustomTextField>

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Category'
          SelectProps={{
            value: findVisa.category ?? '',
            displayEmpty: true,
            onChange: (e) => setFindVisa({ ...findVisa, category: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a category
          </MenuItem>
          {category?.length > 0 &&
            category.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name.toUpperCase()}
              </MenuItem>
            ))}
        </CustomTextField>

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Type'
          SelectProps={{
            value: findVisa.type ?? '',
            displayEmpty: true,
            onChange: (e) => setFindVisa({ ...findVisa, type: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a type
          </MenuItem>
          {type?.length > 0 &&
            type.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name.toUpperCase()}
              </MenuItem>
            ))}
        </CustomTextField>

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Duration'
          SelectProps={{
            value: findVisa.duration ?? '',
            displayEmpty: true,
            onChange: (e) => setFindVisa({ ...findVisa, duration: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a duration
          </MenuItem>
          {duration?.length > 0 &&
            duration.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name.toUpperCase()}
              </MenuItem>
            ))}
        </CustomTextField>

        {loading ? 'loading ...' : selectVisaId()}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type='submit' variant='contained' color='primary' sx={{ mr: 3 }}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose} sx={{ mr: 3 }}>
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default EditVisaBookingForm
