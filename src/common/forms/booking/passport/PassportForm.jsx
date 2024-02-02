//  ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import PhoneIcon from '@mui/icons-material/Phone' // Import an appropriate icon from Material-UI
import Person from '@mui/icons-material/Person' // Import an appropriate icon from Material-UI
import { Grid, Input } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAgent, fetchCompany, fetchClient } from 'src/store'
import { getDataAction } from 'src/action/axiosApiFunc'
import { fetchActionData } from 'src/action/fetchData'

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
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'
import DatePickerHookField from 'src/common/dataEntry/DatePickerHookField'
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField'
import EditFilesUploader from 'src/common/fileUpload/EditFileUploader'
import dayjs from 'dayjs'
import { MuiTextAreaHookField } from 'src/common/dataEntry/MuiTextAreaHookField'
import SelectHookField from 'src/common/dataEntry/SelectHookField'
// import MuiTextAreaHookField from 'src/common/dataEntry/MuiTextAreaHookField'

const schema = yup.object().shape({
  bookletNumber: yup.string().required('Booklet Number is required'),
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

const defaultValues = {
  bookletNumber: '',
  cnic: '',
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
  deletedFiles: [],
  by: ''
}

// ------------------Passport Form-----------------------
const PassportForm = ({ toggle, removeSelection, setFormSize, _id = '' }) => {
  const dispatch = useDispatch()
  const [editId, setEditId] = useState('')
  const passportIdFromState = useSelector(
    state => state.visaBooking?.data?.find(item => item._id === _id)?.passport
  )
  // let editId = useSelector(
  //   state => state.visaBooking?.data?.find(item => item._id === _id)?.passportId
  // )
  // console.log(editId?.passportNumber)
  const [files, setFiles] = useState([])
  const [previousFiles, setPreviousFiles] = useState([])
  const [removeFiles, setRemoveFiles] = useState([])

  // onModel
  const clients = useSelector(state => state.client?.data)
  const company = useSelector(state => state.company?.data)
  const agents = useSelector(state => state.agent?.data)

  useEffect(() => {
    setFormSize(1200)
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
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const passportNumber = getValues('passportNumber')
  useEffect(() => {
    if (editId?.passportNumber) {
      Object.keys(editId).forEach(key => {
        setValue(key, editId[key])
      })
      setPreviousFiles(editId.files)
      setValue('by', editId.by)
      setValue('dob', dayjs(editId.dob))
      setValue('doe', dayjs(editId.doe))
      setValue('doi', dayjs(editId.doi))
    } else {
      reset()
    }
  }, [setValue, editId])
  useEffect(() => {
    setFormSize(1200)
    if (passportNumber.length === 9 && !_id) {
      let params = { passportNumber }
      fetchActionData(() => getDataAction('passport/read', params), setEditId)
    } else if (_id) {
      setEditId(passportIdFromState)
    }
  }, [passportNumber, _id])

  // console.log(editId)

  useEffect(() => {
    setValue('deletedFiles', [removeFiles])
  }, [previousFiles, removeFiles])

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
      name: 'cnic',
      type: 'text',
      required: true
    },
    {
      name: 'surname',
      required: true
    },
    {
      name: 'givenName',
      required: true
    }
  ]

  const passportField2 = [
    {
      name: 'fatherName',
      required: true
    },
    {
      name: 'issuingAuthority'
    },
    {
      name: 'trackingNumber',
      required: true
    },
    {
      textarea: true,
      name: 'remarks',
      required: true,
      placeholder: 'Enter Remarks'
    }
  ]

  const iconStyles = {
    fontSize: '14px',
    position: 'relative',
    top: '2px',
    left: '-3px'
  }
  const listStyles = { borderLeft: '2px solid #1852fe', height: '42px', marginBottom: '5px' }

  const supplier = useSelector(state =>
    state?.supplier?.data?.map(item => ({ name: `${item.name} ${item.phone}`, _id: item._id }))
  )
  let byItems = []
  if (watchedOnModel === 'Client') {
    byItems = clients
  } else if (watchedOnModel === 'Agent') {
    byItems = agents
  } else if (watchedOnModel === 'Company') {
    byItems = company
  }

  const byItem = byItems.map(item => ({
    name: `${item.fullName || item.companyName} ${item.phone}`,
    _id: item._id
  }))

  return (
    <div>
      {/* <MuiTextAreaHookField/> */}
      <form>
        <Grid container spacing={6}>
          {passportField1.map(item => (
            <Grid item md={6} lg={4} key={item.name}>
              <CustomHookTextField item={item} control={control} errors={errors} required={true} />
            </Grid>
          ))}

          <Grid item md={6} lg={4}>
            <SimpleSelectHookField
              control={control}
              errors={errors}
              name={'country'}
              options={['Pakistan', 'Iran', 'Afghanistan', 'Saudi Arbia', 'Turki']}
              label={'Country'}
              placeholder='Search Countries'
              select={true}
              MenuProps={{
                disablePortal: true,
                disableCloseOnSelect: true
              }}
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <SimpleSelectHookField
              control={control}
              errors={errors}
              name={'nationality'}
              options={['Pakistani', 'Indian', 'Afghani']}
              label={'Nationality'}
              placeholder='Search Nationality'
              select={true}
              MenuProps={{
                disablePortal: true,
                disableCloseOnSelect: true
              }}
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <SimpleSelectHookField
              control={control}
              errors={errors}
              name={'gender'}
              options={['Male', 'Female', 'Other']}
              label={'Gender'}
              placeholder='Search Gender'
              select={true}
              MenuProps={{
                disablePortal: true,
                disableCloseOnSelect: true
              }}
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <SimpleSelectHookField
              control={control}
              errors={errors}
              name={'pob'}
              options={['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Peshawar']}
              label={'Place of birth'}
              placeholder='Search places'
              select={true}
              MenuProps={{
                disablePortal: true,
                disableCloseOnSelect: true
              }}
            />
          </Grid>
          <Grid item md={6} lg={4} sx={{ mb: 4 }}>
            <DatePickerHookField
              name='dob'
              placeholder='Date of Birth'
              required={true}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item md={4} lg={4} sx={{ mb: 4 }}>
            <DatePickerHookField
              name='doi'
              placeholder='Date of Issue'
              required={true}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item md={4} lg={4} sx={{ mb: 4 }}>
            <DatePickerHookField
              name='doe'
              placeholder='Date of Expire'
              required={true}
              control={control}
              errors={errors}
              className='inputdate'
            />
          </Grid>

          <Grid item md={6} lg={4}>
            <SimpleSelectHookField
              control={control}
              errors={errors}
              name={'religion'}
              options={['Islam', 'Christan', 'Hindu', 'Sikh']}
              label={'Religion'}
              placeholder='Search Religion'
              select={true}
              MenuProps={{
                disablePortal: true,
                disableCloseOnSelect: true
              }}
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
            <SelectHookField
              control={control}
              errors={errors}
              name='by'
              options={byItem ?? []}
              showValue='name'
              label='Refer'
              placeholder='Choose Refer'
            />
          </Grid>
        
          {!editId ? (
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
          ) : (
            <Grid item md={6}>
              <Box sx={{ width: '200px' }}>
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
                        prevFiles={editId?.files}
                        onChange={onChange}
                      />
                    </>
                  )}
                />
              </Box>
            </Grid>
          )}
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PassportSubmitButton
            editId={editId?.passportId || editId?._id || ''}
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
