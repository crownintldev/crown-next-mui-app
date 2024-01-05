import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import dayjs from 'dayjs'
// ** MUI Imports
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import Box, { BoxProps } from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { useDispatch, useSelector } from 'react-redux'
// ** Actions Imports
import { fetchData } from 'src/store/apps/booking/passport'


//get by data
import axios from 'axios'
import { agentList } from 'src/action/users/agent'
import { companyList } from 'src/action/users/company'
import { clientList } from 'src/action/users/client'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// vuexy components
import EditFilesUploader from 'src/common/fileUpload/EditFileUploader'
import toast from 'react-hot-toast'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  bookletNumber: yup.number().required('Booklet Number is required'),
  cnic: yup.number().required('Cnic Number is required'),
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
  trackingNumber: yup.number().required('Tracking Number is required'),
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
  onModel: '',
  files: [],
  previousFiles: [],
  deletedFiles: [],
  by: ''
}

// ------------------Passport Form-----------------------
const EditPassportForm = ({ toggle, _id, removeSelection }) => {
  // ** State
  const [files, setFiles] = useState([])
  const [previousFiles, setPreviousFiles] = useState([])
  const [removeFiles, setRemoveFiles] = useState([])
  const [date, setDate] = useState(new Date())

  const dispatch = useDispatch()
  const passportId = useSelector(state => state.passport.data.find(item => item._id === _id))

  // onModel
  const [agents, setAgents] = useState()
  const [company, setCompany] = useState()
  const [clients, setClients] = useState()

  const getAgents = async () => {
    try {
      const res = await agentList()
      setAgents(res.data.data)
    } catch (err) {
      console.log('===========', err)
    }
  }

  const getClients = async () => {
    try {
      const res = await clientList()
      setClients(res.data.data)
    } catch (err) {
      console.log('===========', err)
    }
  }

  const getCompany = async () => {
    try {
      const res = await companyList()
      setCompany(res.data.data)
    } catch (err) {
      console.log('===========', err)
    }
  }

  useEffect(() => {
    getAgents()
    getClients()
    getCompany()
  }, [])

  // Form State -------------**
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  useEffect(() => {
    setValue('previousFiles', previousFiles)
    setValue('deletedFiles', removeFiles)
  }, [previousFiles, removeFiles])
  useEffect(() => {
    if (passportId) {
      setPreviousFiles(passportId.files)
      Object.keys(passportId).forEach(key => {
        // @ts-ignore
        setValue('by', passportId.by?._id)
        setValue('dob', dayjs(passportId.dob))
        setValue('doe', dayjs(passportId.doe))
        setValue(key, passportId[key])
        // @ts-ignore
        // fetchFiles(passportId?.files)
      })
    }
  }, [passportId, setValue])
  const watchedOnModel = watch('onModel')

  const handleClose = () => {
    // setPlan('basic')
    // setRole('subscriber')
    toggle()
    // reset()
  }

  const onSubmit = async data => {
    console.log(data)
    if (passportId.status === 'booked') {
      setValue('by', '')
      setValue('onModel', '')
    }
    let formData = new FormData()
    Object.keys(data).forEach(key => {
      if (key === 'previousFiles' && data[key]) {
        // Serialize and append previousFiles if it exists
        formData.append('previousFiles', JSON.stringify(data[key]))
      } else if (key !== 'files') {
        // Append other data fields to formData
        formData.append(key, data[key])
      }
    })

    // Object.keys(data).forEach(key => {
    //   if (key !== 'files') {
    //     formData.append(key, data[key])
    //   }
    // })
    data.files.forEach(file => {
      formData.append('files', file)
    })

    try {
      // const response = await dispatch(editPassport(formData))
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API}/passport/update`, formData)
      if (response) {
        dispatch(
          fetchData({
            limit: 20,
            page: 1
          })
        )
        toggle()
        reset()
        setPreviousFiles([]), setRemoveFiles([]), setFiles([])
        removeSelection()
      }
      toast.success('Update Successfully', { position: 'top-center' })
    } catch (err) {
      const errorMessage =
      err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'An unexpected error occurred'
      console.log(errorMessage)
      toast.error(errorMessage, { position: 'top-center' })
    }
    // const responseAction = await dispatch(editPassport(formData))
    // console.log(responseAction.type)
    // if (responseAction.type === 'appPassports/editPassport/fulfilled') {
    //   toggle()
    //   reset()
    // }
  }

  const addPassportFields = [
    {
      name: 'passportNumber',
      type: 'number'
    },
    {
      name: 'bookletNumber',
      type: 'number'
    },
    {
      name: 'city'
    },
    {
      name: 'cnic',
      type: 'number'
    },
    {
      name: 'country'
    },
    {
      name: 'dob',
      placeholder: 'Date of Birth'
    },
    {
      name: 'doe',
      placeholder: 'Date of Expiry'
    },
    {
      name: 'doi'
    },
    {
      name: 'gender'
    },
    {
      name: 'givenName'
    },
    {
      name: 'fatherName'
    },
    {
      name: 'issuingAuthority'
    },
    {
      name: 'nationality'
    },
    {
      name: 'pob',
      placeholder: 'Place of Birth'
    },
    {
      name: 'religion'
    },

    {
      name: 'surname'
    },
    {
      name: 'trackingNumber',
      type: 'number'
    },
    {
      name: 'remarks'
    }
  ]

  const capitalizeCamelSpace = name => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1)
    return capitalized.replace(/([A-Z])/g, ' $1').trim()
  }
  const theme = useTheme()
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {addPassportFields.map(item => {
          const { name, label, placeholder, type } = item
          return (
            <>
              {name === 'dob' || name === 'doe' ? (
                <Box sx={{ mb: 4 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name={name}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <DatePicker
                          label={placeholder}
                          inputFormat='MM/DD/YYYY'
                          {...field}
                          renderInput={params => (
                            <TextField
                              {...params}
                              size='small'
                              fullWidth
                              error={Boolean(errors.datePicker)}
                              helperText={errors.datePicker?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              ) : (
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
                      placeholder={
                        placeholder ? placeholder : `Enter ${capitalizeCamelSpace(name)}`
                      }
                      error={Boolean(errors[name])}
                      helperText={errors[name]?.message || ''}
                    />
                  )}
                />
              )}
            </>
          )
        })}
        {/* <Controller
          name='doe'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => ( */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'></Box>
        {/* )}
        /> */}
        <Controller
          name='onModel'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              disabled={passportId?.status === 'booked' ? true : false}
              select
              fullWidth
              label='Refer Title'
              error={Boolean(errors.onModel)}
              helperText={errors.onModel?.message}
              // {...field} // Spread the field object
              SelectProps={{
                value: field.value,
                onChange: e => field.onChange(e)
              }}
              sx={{ mb: 4 }}
            >
              <MenuItem value='Client'>Client</MenuItem>
              <MenuItem value='Company'>Company</MenuItem>
              <MenuItem value='Agent'>Agent</MenuItem>
            </CustomTextField>
          )}
        />
        <Controller
          name='by'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              disabled={passportId?.status === 'booked' ? true : false}
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

        <Controller
          name='files'
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <label htmlFor='files'>Upload Files</label>
              <EditFilesUploader
                setFiles={setFiles}
                previousFiles={previousFiles}
                setPreviousFiles={setPreviousFiles}
                removeFiles={removeFiles}
                setRemoveFiles={setRemoveFiles}
                files={files}
                prevFiles={passportId?.files}
                onChange={onChange}
              />
            </>
          )}
        />

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

export default EditPassportForm
