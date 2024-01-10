import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'

// ** MUI Imports
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import toast from 'react-hot-toast'

import Box, { BoxProps } from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// import DatePickerComponent from 'src/common/dataEntry/DatePickerComponent'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAgent, fetchCompany, fetchClient } from 'src/store'

// ** Actions Imports
import { fetchData } from 'src/store/apps/booking/passport'

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
import { capitalizeCamelSpace } from 'src/utils/helperfunction'
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'
import DatePickerHookField from 'src/common/dataEntry/DatePickerHookField'
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField'
import SelectField from 'src/common/dataEntry/SelectField'
import SelectHookField from 'src/common/dataEntry/SelectHookField'

const requiredError = ["cnic", "city", "country", "dob", "doi", "doe", "pob", "gender", "givenName", "fatherName", "nationality", "passportNumber", "religion", "remarks", "surname", "onModel", "by"]

const yupField = requiredError.reduce((acc, item) => {
  acc[item] = yup
    .string()
    .typeError('Field Should not be empty')
    .required('Field Should not be empty')

  return acc
}, {})

const schema = yup.object().shape(yupField)

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
  recievedPassport: '',
  files: [],
  by: ''
}

// ------------------Passport Form-----------------------
const PassportForm = ({ toggle, removeSelection, setFormSize }) => {
  const dispatch = useDispatch()

  const [files, setFiles] = useState([])
  const [date, setDate] = useState(new Date())

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
      name: 'givenName',
      required: true
    },
    {
      name: 'surname',
      required: true
    },
    {
      name: 'passportNumber',
      required: true
    },
    {
      name: "recievedPassport",
      type: 'number',
    }

  ]

  const passportField2 = [
    {
      name: 'cnic',
      type: 'number',
      required: true
    },
    {
      name: 'city',
      required: true
    },
    {
      name: 'country',
      required: true
    },
    {
      name: 'doi',
      required: true
    },
    {
      name: 'gender'
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
      name: 'bookletNumber'
    },
    {
      name: 'trackingNumber',
      type: 'number'
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
              placeholder='Date of Expiry'
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
