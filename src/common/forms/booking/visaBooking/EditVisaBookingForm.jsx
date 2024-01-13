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

//custom vuexy select style
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

// reuse function
import { removeUndefined } from 'src/utils/helperfunction'

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

// components

//get by data
import axios from 'axios'
import { listVisaCategory } from 'src/action/visaIdSelector/visaCategory'
import { listVisaDestination } from 'src/action/visaIdSelector/visaDestination'
import { listVisaDuration } from 'src/action/visaIdSelector/visaDuration'
import { listVisaType } from 'src/action/visaIdSelector/visaType'
import { findVisaId } from 'src/action/visaService'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { fetchActionData } from 'src/action/fetchData'
import { axiosErrorMessage } from 'src/utils/helperfunction'

const schema = yup.object().shape({
  visaBookingIds: yup.array().of(yup.string()).required('Visa booking IDs are required.'),
  status: yup.string().required('Status is required.')
})

const defaultValues = {
  visaBookingIds: [],
  visaId: '',
  confirmed: '',
  processing: '',
  status: 'booked'
}

// ------------------visaBooking Form-----------------------
const EditVisaBookingForm = ({ toggle, _id: ids, removeSelection, setFormSize }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  // ** State
  const dispatch = useDispatch()

  const visaBookingItems = useSelector(
    state =>
      ids &&
      ids.length > 0 &&
      ids
        .map(id => state.visaBooking.data.find(item => item._id === id))
        .map(item => {
          return {
            passportNumber: item.passportId.passportNumber,
            status: item.status,
            givenName: item.passportId.givenName,
            _id: item._id
          }
        })
  )
  useEffect(() => {
    setFormSize(400)
  }, [])

  // selectIds
  const [destination, setDestination] = useState([])
  const [type, setType] = useState([])
  const [duration, setDuration] = useState([])
  const [category, setCategory] = useState([])

  const [findVisa, setFindVisa] = useState({
    destination: '',
    category: '',
    type: '',
    duration: ''
  })
  const [selectedValue, setSelectedValue] = useState('')

  const handleChange = event => {
    setSelectedValue(event.target.value)
  }

  const [visa, setVisa] = useState('')

  useEffect(() => {
    fetchActionData(listVisaCategory, setCategory)
    fetchActionData(listVisaDestination, setDestination)
    fetchActionData(listVisaDuration, setDuration)
    fetchActionData(listVisaType, setType)
  }, [])
  useEffect(() => {
    const { destination, category, duration, type } = findVisa
    if (destination && category && type && duration) {
      fetchActionData(() => findVisaId({ destination, category, type, duration }), setVisa)
    }
  }, [findVisa])

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
  useEffect(() => {
    if (ids) {
      setValue('visaBookingIds', ids)
      setValue('status', 'booked')
      if (visa && visa.length === 0) {
        setValue('visaId', '')
      }
      if (visa._id) {
      }
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

  const onSubmit = async data => {
    if (!visa._id) {
      return toast.error('add Visa Must', { position: 'top-center' })
    }
    setValue('visaId', visa._id)
    const paymentType = watch('paymentType')
    if (paymentType === 'confirmed') {
      setValue(paymentType, visa.confirmed)
      setValue('processing', undefined)
    }
    if (paymentType === 'processing') {
      setValue(paymentType, visa.processing)
      setValue('confirmed', undefined)
    }
    removeUndefined(data)
    console.log(data)

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API}/visa-booking/update`, data)
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

  const selectVisaId = () => {
    if (!visa) {
      return findVisa.category && findVisa.destination && findVisa.duration && findVisa.type ? (
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
      ) : null
    }

    return (
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {['confirmed', 'processing'].map(
            type =>
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
      </Box>
    )
  }

  const renderSelectedValue = selectedIds => {
    return selectedIds
      .map(id => {
        const item = visaBookingItems.find(item => item._id === id)

        return item ? `${item.passportNumber} ${item.givenName}` : ''
      })
      .filter(Boolean) // Removes any undefined or empty values
      .join(', ')
  }

  return (
    <div>
      <FormDrawer
        open={drawerOpen}
        toggle={toggleDrawer}
        drawerTitle={'Add Visa Service'}
        Form={VisaServiceForm}
        anchor='left'
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
              {visaBookingItems &&
                visaBookingItems.length > 0 &&
                visaBookingItems.map((item, index) => (
                  <MenuItem key={index} value={`${item._id}`}>
                    {`${item.passportNumber} ${item.givenName}`}
                  </MenuItem>
                ))}
            </CustomTextField>
          )}
        />
        <Controller
          name='status'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              select
              fullWidth
              label='Status'
              error={Boolean(errors.status)}
              helperText={errors.status?.message}
              {...field} // Spread the field object
              SelectProps={{
                value: field.value,
                displayEmpty: true,
                onChange: e => field.onChange(e)
              }}
              sx={{ mb: 4 }}
            >
              <MenuItem value='' disabled>
                Select a Status
              </MenuItem>
              <MenuItem value='pending'>pending</MenuItem>
              <MenuItem value='booked'>booked</MenuItem>
              <MenuItem value='inprocess'>inprocess</MenuItem>
              <MenuItem value='verification'>verification</MenuItem>
              <MenuItem value='approved'>approved</MenuItem>
              <MenuItem value='rejected'>rejected</MenuItem>
              <MenuItem value='returned'>returned</MenuItem>
              <MenuItem value='cancelled'>cancelled</MenuItem>
              <MenuItem value='inprocessCancelled'>inprocessCancelled</MenuItem>
              <MenuItem value='paid'>paid</MenuItem>
            </CustomTextField>
          )}
        />
        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Destination'
          SelectProps={{
            value: findVisa.destination,
            displayEmpty: true,
            onChange: e => setFindVisa({ ...findVisa, destination: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a destination
          </MenuItem>
          {destination?.length > 0 &&
            destination.map(item => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name}
              </MenuItem>
            ))}
        </CustomTextField>

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Category'
          SelectProps={{
            value: findVisa.category,
            displayEmpty: true,
            onChange: e => setFindVisa({ ...findVisa, category: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a category
          </MenuItem>
          {category?.length > 0 &&
            category.map(item => (
              <MenuItem key={item._id} value={item._id}>
                {capitalizeValue(item?.name)}
              </MenuItem>
            ))}
        </CustomTextField>

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Type'
          SelectProps={{
            value: findVisa.type,
            displayEmpty: true,
            onChange: e => setFindVisa({ ...findVisa, type: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a type
          </MenuItem>
          {type?.length > 0 &&
            type.map(item => (
              <MenuItem key={item._id} value={item._id}>
                <div style={{ textTransform: 'capitalize' }}>{item?.name}</div>
              </MenuItem>
            ))}
        </CustomTextField>

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Duration'
          SelectProps={{
            value: findVisa.duration,
            displayEmpty: true,
            onChange: e => setFindVisa({ ...findVisa, duration: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a duration
          </MenuItem>
          {duration?.length > 0 &&
            duration.map(item => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name}
              </MenuItem>
            ))}
        </CustomTextField>

        {selectVisaId()}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type='submit' variant='contained' color='primary' sx={{ mr: 3 }}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose} sx={{ mr: 3 }}>
            Cancel
          </Button>
          <Button variant='tonal' color='success'>
            Back
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default EditVisaBookingForm
