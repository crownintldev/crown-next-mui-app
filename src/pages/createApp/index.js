// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { addCardDetails } from 'src/store/apps/createApp/index'
// ** Hook Imports

import { useSettings } from 'src/@core/hooks/useSettings'

// // ** Tab Content Imports
import DialogAppSelection from 'src/pages/createApp/create-app-tabs/DialogAppSelection'
import DialogTabBilling from 'src/pages/createApp/create-app-tabs/DialogTabBilling'
import DialogTabDatabase from 'src/pages/createApp/create-app-tabs/DialogTabDatabase'
import DialogUseCase from 'src/pages/createApp/create-app-tabs/DialogUseCase'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const TabLabel = props => {
  const { icon, title, subtitle, active } = props

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            ...(active
              ? { color: 'common.white', backgroundColor: 'primary.main' }
              : { backgroundColor: 'action.selected' })
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='h6'>{title}</Typography>
          <Typography sx={{ textTransform: 'none', color: 'text.disabled', fontWeight: 500 }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

const DialogCreateApp = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })
  const [activeTab, setActiveTab] = useState('appSelectionTab')
  const [appSelection, setAppSelection] = useState('')
  const [databaseSelection, setDatabaseSelection] = useState('mongodb')
  const [useCaseValue, setUseCaseValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [customErr, setCustomErr] = useState(false)
  // ** card details States
  const [name, setName] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')

  const defaultValues = {
    selectedApp: '',
    selectedUseCase: '',
    selectedDatabase: 'mongodb',
    cardDetails: {
      cvc: '',
      expiry: '',
      name: '',
      number: ''
    }
  }
  // ** Hook
  const { settings, saveSettings } = useSettings()
  const auth = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Var
  const tabsArr = ['appSelectionTab', 'useCaseTab', 'DatabaseTab', 'paymentTab', 'submitTab']

  const { direction, createAppModal } = settings
  const nextArrow = direction === 'ltr' ? 'tabler:arrow-right' : 'tabler:arrow-left'
  const previousArrow = direction === 'ltr' ? 'tabler:arrow-left' : 'tabler:arrow-right'
  const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
  const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

  const CustomCloseButton = styled(IconButton)(({ theme }) => ({
    top: 0,
    right: 0,
    color: 'grey.500',
    position: 'absolute',
    boxShadow: theme.shadows[2],
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.background.paper} !important`,
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
      transform: 'translate(7px, -5px)'
    }
  }))
  const handleClose = () => {
    setShow(false)
    setActiveTab('appSelectionTab')
  }

  const renderTabFooter = () => {
    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='tonal'
          color='secondary'
          sx={{ py: 2.5 }}
          disabled={activeTab === 'appSelectionTab' || loading}
          onClick={() => {
            if (customErr) {
              setActiveTab(prevTab)
              setCustomErr(false)
            } else {
              setActiveTab(prevTab)
            }
          }}
          startIcon={<Icon icon={previousArrow} />}
        >
          Previous
        </Button>

        {/* <Button type='submit' variant='contained'>
          {loading ? (
            <CircularProgress
              sx={{
                color: 'common.white',
                width: '20px !important',
                height: '20px !important',
                mr: theme => theme.spacing(2)
              }}
            />
          ) : null}
          Submit
        </Button> */}

        {activeTab === 'submitTab' ? (
          <Button
            type='submit'
            disabled={loading}
            sx={{ py: 2 }}
            variant='contained'
            color={'success'}
          >
            Submit
            {loading ? (
              <CircularProgress
                sx={{
                  color: 'common.white',
                  width: '20px !important',
                  height: '20px !important',
                  mr: theme => theme.spacing(4)
                }}
              />
            ) : (
              <Icon icon={'tabler:check'} />
            )}
          </Button>
        ) : (
          <Button
            variant='contained'
            disabled={loading}
            sx={{ py: 2 }}
            color={'primary'}
            onClick={handleNextTabClick}
          >
            Next
            {loading ? (
              <CircularProgress
                sx={{
                  color: 'common.white',
                  width: '20px !important',
                  height: '20px !important',
                  mr: theme => theme.spacing(2)
                }}
              />
            ) : (
              <Icon icon={nextArrow} />
            )}
          </Button>
        )}
      </Box>
    )
  }
  const onSubmit = async data => {
    setLoading(true)
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(2000)
    data['referenceId'] = auth.user._id
    const responseAction = await dispatch(addCardDetails({ data: data, token: auth.user.token }))
    console.log('====== values responseAction ==', responseAction)
    const { payload } = responseAction
    if (payload && payload.Record && payload.status === 'SUCCESS') {
      toast.success(payload.message, {
        duration: 2000
      })
      saveSettings({ ...settings, createAppModal: false })
      setLoading(false)
      router.push('/accounts/dashboards/analytics')
    } else {
      // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
      // await sleep(2000)
      setLoading(false)
      auth.logout()
      toast.error('Error Occurred Try Again Later', {
        duration: 4000
      })
    }
    setLoading(false)
  }
  // Reset customErr when any selection changes and is not empty

  const handleNextTabClick = async () => {
    if (activeTab !== 'submitTab') {
      setLoading(true)
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
      await sleep(500) // Simulate loading time
      setLoading(false)

      if (activeTab === 'appSelectionTab') {
        if (appSelection !== '') {
          setActiveTab('useCaseTab')
          setCustomErr(false)
        } else {
          setCustomErr(true)
        }
      } else if (activeTab === 'useCaseTab') {
        if (useCaseValue !== '') {
          setActiveTab('DatabaseTab')
          setCustomErr(false)
        } else {
          setCustomErr(true)
        }
      } else if (activeTab === 'DatabaseTab') {
        if (databaseSelection !== '') {
          setActiveTab('paymentTab')
          setCustomErr(false)
        } else {
          setCustomErr(true)
        }
      } else if (activeTab === 'paymentTab') {
        // Check if all payment fields are filled
        // const { cardNumber, expiry, cvc, name } = cardDetails
        if (cardNumber !== '' && expiry !== '' && cvc !== '' && name !== '') {
          setActiveTab('submitTab')
          setCustomErr(false)
          setValue('cardDetails', cardDetails)
        } else {
          setCustomErr(true)
        }
      }
      // Additional else if conditions can be added for other tabs if necessary
    }
  }

  useEffect(() => {
    if (auth && auth.user && auth.user.accountSetupStatus === 'pending') {
      saveSettings({ ...settings, createAppModal: true })
    }
  }, [auth.user, router.asPath])
  return (
    <Dialog
      fullWidth
      open={createAppModal}
      scroll='body'
      maxWidth='md'
      // onClose={handleClose}
      // onBackdropClick={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent
        sx={{
          height: '100%',
          pr: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pl: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(11)} !important`],
          py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        {/* <CustomCloseButton onClick={handleClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton> */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h3' sx={{ mb: 1 }}>
            Travokey App Setup
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Welcome to your First Travokey Solution
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
          <TabContext value={activeTab}>
            <TabList
              orientation='vertical'
              // onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                border: 0,
                minWidth: 250,
                '& .MuiTabs-indicator': { display: 'none' },
                '& .MuiTabs-flexContainer': {
                  alignItems: 'flex-start',
                  '& .MuiTab-root': {
                    width: '100%',
                    alignItems: 'flex-start'
                  }
                }
              }}
            >
              <Tab
                disableRipple
                value='appSelectionTab'
                disabled
                // disabled={appSelection === '' && activeTab === 'useCaseTab' ? true : false}
                label={
                  <TabLabel
                    title='Apps Selection'
                    subtitle='Select Your Apps'
                    active={activeTab === 'appSelectionTab'}
                    icon={<Icon icon='tabler:file-description' />}
                  />
                }
              />
              <Tab
                disableRipple
                disabled
                // disabled={appSelection === '' && activeTab === 'useCaseTab' && true}
                value='useCaseTab'
                label={
                  <TabLabel
                    title='Use Case'
                    icon={<Icon icon='tabler:3d-cube-sphere' />}
                    subtitle='Select Use Method'
                    active={activeTab === 'useCaseTab'}
                  />
                }
              />
              <Tab
                disableRipple
                disabled
                value='DatabaseTab'
                label={
                  <TabLabel
                    title={useCaseValue === 'desktopApp' ? 'Verification' : 'Database'}
                    active={activeTab === 'DatabaseTab'}
                    subtitle={useCaseValue === 'desktopApp' ? 'Generate Key' : 'Select Database'}
                    icon={<Icon icon='tabler:database' />}
                  />
                }
              />

              <Tab
                disableRipple
                disabled
                value='paymentTab'
                label={
                  <TabLabel
                    title='Billing'
                    active={activeTab === 'paymentTab'}
                    subtitle='Payment details'
                    icon={<Icon icon='tabler:credit-card' />}
                  />
                }
              />
              <Tab
                disableRipple
                disabled
                value='submitTab'
                label={
                  <TabLabel
                    title='Submit'
                    subtitle='Submit'
                    icon={<Icon icon='tabler:check' />}
                    active={activeTab === 'submitTab'}
                  />
                }
              />
            </TabList>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: { xs: 'wrap', md: 'nowrap' }
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <TabPanel
                  value='appSelectionTab'
                  sx={{ flexGrow: 1, p: '0 !important', mt: [6, 0] }}
                >
                  <DialogAppSelection
                    value={appSelection}
                    setValue={setAppSelection}
                    control={control}
                    errors={errors}
                    customErr={customErr}
                  />
                </TabPanel>
                <TabPanel value='useCaseTab' sx={{ flexGrow: 1, p: '0 !important', mt: [6, 0] }}>
                  <DialogUseCase
                    value={useCaseValue}
                    setValue={setUseCaseValue}
                    control={control}
                    errors={errors}
                    customErr={customErr}
                  />
                </TabPanel>
                <TabPanel value='DatabaseTab' sx={{ flexGrow: 1, p: '0 !important', mt: [6, 0] }}>
                  <DialogTabDatabase
                    useCaseValue={useCaseValue}
                    setUseCaseValue={setUseCaseValue}
                    value={databaseSelection}
                    setValue={setDatabaseSelection}
                    control={control}
                    errors={errors}
                    customErr={customErr}
                  />
                </TabPanel>
                <TabPanel value='paymentTab' sx={{ flexGrow: 1, p: '0 !important', mt: [6, 0] }}>
                  <DialogTabBilling
                    cardDetails={cardDetails}
                    setCardDetails={setCardDetails}
                    customErr={customErr}
                    name={name}
                    setName={setName}
                    cvc={cvc}
                    setCvc={setCvc}
                    cardNumber={cardNumber}
                    setCardNumber={setCardNumber}
                    expiry={expiry}
                    setExpiry={setExpiry}
                  />
                </TabPanel>
                <TabPanel value='submitTab' sx={{ flexGrow: 1, p: '0 !important', mt: [6, 0] }}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant='h4' sx={{ mb: 2 }}>
                      Submit 🥳
                    </Typography>
                    <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                      Submit to kickstart your Travokey App.
                    </Typography>

                    <img width={200} alt='submit-img' src='/images/pages/girl-with-laptop.png' />
                  </Box>
                </TabPanel>
                {renderTabFooter()}
              </form>
            </Box>
          </TabContext>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCreateApp
