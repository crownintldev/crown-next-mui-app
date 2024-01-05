// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports

import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import { styled, alpha, useTheme } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Autocomplete, TextField } from '@mui/material'
import MuiAutoComplete from 'src/common/dataEntry/MuiAutoComplete'

//action
import { listVisaCategory } from 'src/action/visaIdSelector/visaCategory'
import { listVisaDestination } from 'src/action/visaIdSelector/visaDestination'
import { listVisaDuration } from 'src/action/visaIdSelector/visaDuration'
import { listVisaType } from 'src/action/visaIdSelector/visaType'
import { findVisaId } from 'src/action/visaService'
import { fetchActionData } from 'src/action/fetchData'
import { filterInvoiceAccount } from 'src/action/account'

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-2.375rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('md')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(16, 10, 10),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(16)
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(10)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6)
  }
}))

const InvoiceAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const AddCardItemSelect = ({
  data,
  clients,
  invoiceData,
  userCategory,
  selectUser,
  setInvoiceData
}) => {
  const [count, setCount] = useState(1)
  const [selectApp, setSelectApp] = useState('')
  //finding Visa Id States Effect

  const [destinations, setDestinations] = useState()
  const [types, setTypes] = useState()
  const [durations, setDurations] = useState()
  const [categorys, setCategorys] = useState()

  const [findVisa, setFindVisa] = useState({
    destination: null,
    category: null,
    type: null,
    duration: null
  })

  const { accountDetails, grandFee } = invoiceData

  useEffect(() => {
    fetchActionData(listVisaCategory, setCategorys)
    fetchActionData(listVisaDestination, setDestinations)
    fetchActionData(listVisaDuration, setDurations)
    fetchActionData(listVisaType, setTypes)
  }, [])

  // end finding Visa Ids State

  const handleSelectApp = (event, value) => {
    setFindVisa({ destination: null, category: null, type: null, duration: null })
    setSelectApp(value)
  }

  const handleFindVisa = name => (event, value) => {
    setInvoiceData([])
    setFindVisa({ ...findVisa, [name]: value?._id ? value._id : '' })
    // setInvoiceData
    fetchActionData(
      () => filterInvoiceAccount({ userId: selectUser._id, ...findVisa }),
      setInvoiceData
    )
  }

  const deleteForm = e => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  const optionSelectApp = ['Visa Service', 'Hotel Service']

  const visaBookingIds = data.length > 0 ? data.flatMap(({ visaBookingIds }) => visaBookingIds) : []
 
  return (
    <RepeaterWrapper>
      <Repeater count={count}>
        {i => {
          const Tag = i === 0 ? Box : Collapse

          return (
            <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
              <Grid container>
                <RepeatingContent item xs={12}>
                  <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                    <Grid item lg={6} md={6} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                      <Typography
                        className='col-title'
                        sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}
                      >
                        Item
                      </Typography>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Selected App: Visa Service
                      </Typography>

                      {/* <MuiAutoComplete
                        options={optionSelectApp}
                        onChange={handleSelectApp}
                        label='Select App'
                      /> */}
                      {/* <CustomTextField fullWidth select defaultValue='App Design'>
                        
                          <MenuItem value='App Design'>Select App</MenuItem>
                          <MenuItem value='App Customization'>App Customization</MenuItem>
                          <MenuItem value='ABC Template'>ABC Template</MenuItem>
                          <MenuItem value='App Development'>App Development</MenuItem>
                        </CustomTextField> */}

                      <Box>
                        <Typography sx={{ fontWeight: 'medium' }}>
                          category: {visaBookingIds[0]?.visaId.category}
                        </Typography>
                        <Typography sx={{ fontWeight: 'medium' }}>
                          duration: {visaBookingIds[0]?.visaId.duration}
                        </Typography>
                        <Typography sx={{ fontWeight: 'medium' }}>
                          type: {visaBookingIds[0]?.visaId.type}
                        </Typography>
                        <Typography sx={{ fontWeight: 'medium' }}>
                          destination: {visaBookingIds[0]?.visaId.destination}
                        </Typography>
                      </Box>

                      {/* {selectApp === 'Visa Service' && (
                        <>
                          <Typography className='pt-2'>
                            Select All Field to find Passport List
                          </Typography>
                          <Box className='flex space-x-1 flex-wrap'>
                            <MuiAutoComplete
                              options={categorys}
                              width={150}
                              style={{ mt: '10px' }}
                              onChange={handleFindVisa('category')}
                              getOptionLabel={option => option.name}
                              label='Category'
                            />
                            <MuiAutoComplete
                              options={destinations}
                              width={150}
                              style={{ mt: '10px' }}
                              onChange={handleFindVisa('destination')}
                              getOptionLabel={option => option.name}
                              label='Destination'
                            />
                            <MuiAutoComplete
                              options={durations}
                              width={150}
                              style={{ mt: '10px' }}
                              onChange={handleFindVisa('duration')}
                              getOptionLabel={option => option.name}
                              label='Duration'
                            />
                            <Autocomplete
                              size='small'
                              sx={{ width: 150, color: 'black', mt: '10px' }}
                              options={types}
                              id='autocomplete-outlined'
                              getOptionLabel={option => option.name}
                              onChange={handleFindVisa('type')}
                              renderInput={params => <TextField {...params} label='Type' />}
                            />
                          </Box>
                        </>
                      )} */}
                    </Grid>

                    <Grid item lg={6} md={6} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                      <Typography
                        className='col-title'
                        sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}
                      >
                        List of Passports
                      </Typography>
                      {data.map(item => (
                        <Box className='flex space-x-2 mt-4' key={item._id}>
                          <Typography sx={{ mr: 2, color: 'text.secondary' }}>
                            Ref Category: {item.onModel}
                          </Typography>
                          <Typography sx={{ mr: 2, color: 'text.secondary' }}>
                            Ref Name: {item.by?.fullName ? item.by?.fullName : item.by?.companyName}
                          </Typography>
                        </Box>
                      ))}
                      {/* <Box className='w-full mt-4'>
                        <Stack direction='row' spacing={1}>
                          {accountDetails?.length > 0 &&
                            accountDetails.map((item, index) => (
                              <Chip
                                key={index}
                                label={item?.passports?.passportNumber.substring(
                                  item?.passports?.passportNumber.length - 4
                                )}
                              />
                            ))}
                        </Stack>
                      </Box> */}
                      <Box className='w-full mt-4'>
                        <Stack direction='row' spacing={1}>
                          {visaBookingIds?.length > 0 &&
                            visaBookingIds.map((item, index) => (
                              <Chip
                                key={index}
                                label={item?.passportId?.passportNumber.substring(
                                  item?.passportId?.passportNumber.length - 4
                                )}
                              />
                            ))}
                        </Stack>
                      </Box>
                    </Grid>

                    {/* <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                      <Typography
                        className='col-title'
                        sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}
                      >
                        Ref Name
                      </Typography>
                      <Typography sx={{ mt: 3.5, mr: 2, color: 'text.secondary' }}>
                        {selectUser._id ? selectUser.companyName || selectUser.fullName : ''}
                      </Typography>
                    </Grid> */}
                  </Grid>
                  <InvoiceAction>
                    <IconButton size='small' onClick={deleteForm}>
                      <Icon icon='tabler:x' fontSize='1.25rem' />
                    </IconButton>
                  </InvoiceAction>
                </RepeatingContent>
              </Grid>
            </Tag>
          )
        }}
      </Repeater>

      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} sx={{ px: 0 }}>
          <Button variant='contained' onClick={() => setCount(count + 1)}>
            Add Item
          </Button>
        </Grid>
      </Grid>
    </RepeaterWrapper>
  )
}

export default AddCardItemSelect
