//  ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import Box, { BoxProps } from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAgent, fetchCompany, fetchClient } from 'src/store'
// ** Actions Imports

// components
import PassportSubmitButton from './SubmitButton'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// vuexy components
import FilesUploader from 'src/common/fileUpload/FilesUploader'

//
import { Grid } from '@mui/material'
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'
import DatePickerHookField from 'src/common/dataEntry/DatePickerHookField'
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField'

const schema = yup.object().shape({
  bookletNumber: yup.string().required('Booklet Number is required'),
  cnic: yup.string().required('Cnic Number is required'),
  city: yup.string().required('City is required.'),
  country: yup.string().required('Country is required'),
  dob: yup.date().required('Date of Birth is required'),
  doi: yup.string().required('Digital Object Identifier'),
  doe: yup.date().required('Date of Expiry is required'),
  pob: yup.string().required('Place of Birth is required'),
  gender: yup.string().required('Gender is required'),
  givenName: yup.string().required('Given Name is required'),
  fatherName: yup.string().required('Father name is required'),
  issuingAuthority: yup.string().required('Issuing Authority is required'),
  nationality: yup.string().required('Nationality is required'),
  passportNumber: yup.string().required('Passport Number is required'),
  religion: yup.string().required('Religion is required'),
  remarks: yup.string().required('Remarks is required'),
  surname: yup.string().required('Surname is required'),
  trackingNumber: yup.string().required('Tracking Number is required'),
  onModel: yup.string().required('Refer Category is required'),
  by: yup.string().required('Refer is required'),
  files: yup.array().required('Files Are Missing')
})

const defaultValues = {
  bookletNumber: '',
  cnic: '',
  city: '',
  country: '',
  dob: '',
  doi: '',
  gender: '',
  givenName: '',
  fatherName: '',
  issuingAuthority: '',
  nationality: '',
  passportNumber: '',
  religion: '',
  remarks: '',
  surname: '',
  trackingNumber: '',
  onModel: 'Agent',
  files: [],
  by: ''
}

// ------------------Passport Form-----------------------
const PassportForm = ({ toggle, removeSelection, setFormSize }) => {
  const dispatch = useDispatch()

  const [files, setFiles] = useState([])
  const [date, setDate] = useState(new Date())

  const schema = yup.object().shape({
    bookletNumber: yup.string().required('Booklet Number is required'),
    city: yup.string().required('City is required.'),
    cnic: yup
      .string()
      .required('CNIC Number is required')
      .matches(/^[0-9]{13}$|^[0-9]{5}-[0-9]{7}-[0-9]$/, 'Invalid CNIC format')
      .test('is-numeric', 'Invalid CNIC format, only numbers are allowed', value => {
        if (!value) return true // Skip validation if value is empty
        return /^\d+$/.test(value.replace(/-/g, ''))
      })
      .max(15, 'CNIC must be 15 numbers or less')
      .typeError('Invalid CNIC format, only numbers are allowed'),
    country: yup.string().required('Country is required'),
    dob: yup.date().required('Date of Birth is required'),
    doi: yup.string().required('Digital Object Identifier'),
    doe: yup.date().required('Date of Expiry is required'),
    pob: yup.string().required('Place of Birth is required'),
    gender: yup.string().required('Gender is required'),
    givenName: yup.string().required('Given Name is required'),
    fatherName: yup.string().required('Father name is required'),
    issuingAuthority: yup.string().required('Issuing Authority is required'),
    nationality: yup.string().required('Nationality is required'),
    passportNumber: yup.string().required('Passport Number is required'),
    religion: yup.string().required('Religion is required'),
    remarks: yup.string().required('Remarks is required'),
    surname: yup.string().required('Surname is required'),
    trackingNumber: yup.string().required('Tracking Number is required'),
    onModel: yup.string().required('Refer Category is required'),
    by: yup.string().required('Refer is required'),
    files: yup.array().required('Files Are Missing')
  })

  useEffect(() => {
    setFormSize(1200)
  }, [])

  // onModel
  const clients = useSelector(state => state.client?.data)
  const company = useSelector(state => state.company?.data)
  const agents = useSelector(state => state.agent?.data)
  useEffect(() => {
    dispatch(fetchAgent({}))
    dispatch(fetchClient({}))
    dispatch(fetchCompany({}))
  }, [])

  const {
    reset,
    control,
    setError,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const watchedOnModel = watch('onModel')

  const handleClose = () => {
    toggle()
    reset()
    setFormSize(400)
  }

  const passportField1 = [
    {
      name: 'passportNumber',
      required: true
    },
    {
      name: 'bookletNumber'
    },
    {
      name: 'city',
      required: true
    },
    {
      name: 'cnic',
      type: 'text',
      required: true
    },
    {
      name: 'country',
      required: true
    }
  ]

  const passportField2 = [
    {
      name: 'doi',
      required: true
    },
    {
      name: 'gender'
    },
    {
      name: 'givenName',
      required: true
    },
    {
      name: 'fatherName',
      required: true
    },
    {
      name: 'issuingAuthority'
    },
    {
      name: 'nationality',
      required: true
    },
    {
      name: 'pob',
      placeholder: 'Place of Birth',
      required: true
    },
    {
      name: 'religion',
      required: true
    },

    {
      name: 'surname',
      required: true
    },
    {
      name: 'trackingNumber',
      required: true
    },
    {
      name: 'remarks',
      required: true
    }
  ]

  return (
    <div>
      <form>
        <Grid container spacing={6}>
          {passportField1.map(item => (
            <Grid item md={6} lg={4} key={item.name}>
              <CustomHookTextField item={item} control={control} errors={errors} required={true} />
            </Grid>
          ))}
          <Grid item md={6} lg={4} sx={{ mb: 4 }}>
            <DatePickerHookField
              name='dob'
              placeholder='Date of Birth'
              required={true}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item md={6} lg={4} sx={{ mb: 4 }}>
            <DatePickerHookField
              name='doe'
              placeholder='Date of Expirt'
              required={true}
              control={control}
              errors={errors}
            />
          </Grid>
          {passportField2.map(item => (
            <Grid item md={6} lg={4} key={item.name}>
              <CustomHookTextField item={item} control={control} errors={errors} required={true} />
            </Grid>
          ))}
          <Grid item md={6} lg={4}>
            <SimpleSelectHookField
              control={control}
              errors={errors}
              name={'onModel'}
              options={['Client', 'Company', 'Agent']}
              label={'Refer'}
              placeholder='Select Refer'
              select={true}
              MenuProps={{
                disablePortal: true,
                disableCloseOnSelect: true
              }}
            />
          </Grid>

          <Grid item md={6} lg={4}>
            <Controller
              name='by'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Select Refer To'
                  error={Boolean(errors.by)}
                  helperText={errors.by?.message}
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  sx={{ mb: 4 }}
                >
                  <MenuItem value='' disabled>
                    Select refer
                  </MenuItem>
                  {watchedOnModel === 'Client' &&
                    clients?.map(item => (
                      <MenuItem key={item} value={item._id}>
                        <div>
                          <div>Phone: {item.phone && item.phone}</div>
                          <div>Name: {item.fullName && item.fullName}</div>
                        </div>
                      </MenuItem>
                    ))}
                  {watchedOnModel === 'Agent' &&
                    agents?.map(item => (
                      <MenuItem key={item} value={item._id}>
                        <div>
                          <div>Phone: {item.phone && item.phone}</div>
                          <div>Name: {item.fullName && item.fullName}</div>
                        </div>
                      </MenuItem>
                    ))}
                  {watchedOnModel === 'Company' &&
                    company?.map(item => (
                      <MenuItem key={item} value={item._id}>
                        <div>
                          <div>Phone: {item.phone && item.phone}</div>
                          <div>Name: {item.companyName && item.companyName}</div>
                        </div>
                      </MenuItem>
                    ))}
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item md={6}>
            <Box sx={{ width: '200px' }}>
              <Controller
                name='files'
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <label htmlFor='files'>Upload Files</label>
                    <FilesUploader setFiles={setFiles} files={files} onChange={onChange} />
                  </>
                )}
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PassportSubmitButton
            dispatch={dispatch}
            watch={watch}
            toggle={toggle}
            setFiles={setFiles}
            reset={reset}
            removeSelection={removeSelection}
          />
          {/* <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={()=>{console.log("sdfsdf")}}>
            Submit
          </Button> */}
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default PassportForm
