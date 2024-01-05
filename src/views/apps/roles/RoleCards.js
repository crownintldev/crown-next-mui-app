// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/useAuth'
import { addUserRole, fetchUserRoles } from 'src/store/apps/role&permissions'
import ModuleContainer from './moduleContainer'
import { useForm, Controller } from 'react-hook-form'

import { FormHelperText } from '@mui/material'

const cardData = [
  { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  {
    totalUsers: 7,
    title: 'Manager',
    avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png']
  },
  { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
  { totalUsers: 3, title: 'Support', avatars: ['1.png', '2.png', '3.png'] },
  { totalUsers: 2, title: 'Restricted User', avatars: ['4.png', '5.png'] }
]

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [selectedPermissions, setSelectedPermissions] = useState({})
  const [initialValues, setInitialValues] = useState('')

  const dispatch = useDispatch()
  const { userRoles, spinner, success, message } = useSelector(state => state.permissions)

  const auth = useAuth()
  const handleClickOpen = () => {
    setOpen(true)
  }
  let formData = {}
  const defaultValues = {
    title: '',
    permissionDetails: ''
  }
  console.log('====userRoleDetails===', userRoles)
  const {
    setError,
    clearErrors,
    setValue,
    getValues,
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
  })
  const handleClose = () => {
    setOpen(false)
    reset()
    setSelectedPermissions({})
  }

  const getUserRoles = async () => {
    const data = {
      query: 'all'
      // Include other properties as needed
    }
    dispatch(fetchUserRoles({ data, token: auth.user.token, recordName: 'userRoles' }))
  }
  useEffect(() => {
    getUserRoles()
  }, [])

  const renderCards = () =>
    userRoles &&
    userRoles.length > 0 &&
    userRoles.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box
              sx={{
                mb: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {/* <Typography
                sx={{ color: 'text.secondary' }}
              >{`Total ${item.title} users`}</Typography> */}
              <AvatarGroup
                max={4}
                className='pull-up'
                sx={{
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    fontSize: theme => theme.typography.body2.fontSize
                  }
                }}
              >
                {/* {item.avatars.map((img, index) => (
                  <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
                ))} */}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h4' sx={{ mb: 1, textTransform: 'capitalize' }}>
                  {item.title}
                </Typography>
                <Typography
                  href='/'
                  component={Link}
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none'
                  }}
                  onClick={e => {
                    e.preventDefault()
                    setDialogTitle('Edit')
                    setInitialValues(item._id)
                    handleClickOpen()
                  }}
                >
                  Edit Role
                </Typography>
              </Box>
              <IconButton size='small' sx={{ color: 'text.disabled' }}>
                <Icon icon='tabler:copy' />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  console.log('===formData selectedPermissions=== ', selectedPermissions)
  console.log('===formData initialValues=== ', initialValues)
  const onSubmit = data => {
    if (data && data.title && selectedPermissions) {
      const permissionsArray = Object.keys(selectedPermissions).flatMap(key =>
        selectedPermissions[key].map(permission => ({
          ...permission
        }))
      )
      setValue('permissionDetails', permissionsArray)
      formData = getValues()
      const { permissionDetails } = formData
      if (permissionDetails.length > 0) {
        console.log('===formData ', formData)
        dispatch(
          addUserRole({
            values: formData,
            token: auth && auth.user.token,
            recordName: 'userRoles'
          })
        )
        handleClose() // Close dialog after submission or move it inside a success response
      } else {
        setError('permissionDetails', {
          type: 'manual',
          message: 'Select Permissions to Add Role'
        })
      }
    }
  }

  useEffect(() => {
    let val = Object.keys(selectedPermissions)
    if (val.length > 0) {
      clearErrors('permissionDetails')
    }
  }, [selectedPermissions])
  useEffect(() => {}, [initialValues])
  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: 140,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
              >
                <img
                  height={122}
                  alt='add-role'
                  src='/images/pages/add-new-role-illustration.png'
                />
              </Box>
            </Grid>
            <Grid item xs={7}>
              {/* <CardContent sx={{ pl: 0, height: '100%' }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add New Role
                  </Button>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Add role, if it doesn't exist.
                  </Typography>
                </Box>
              </CardContent> */}
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle
          component='div'
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h3'>{`${dialogTitle} Role`}</Typography>
          <Typography color='text.secondary'>Set Role Permissions</Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(5)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      // disabled={auth.spinner}
                      label='Role Name'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Enter Role Name'
                      error={Boolean(errors.title)}
                      {...(errors.title && { helperText: errors.title.message })}
                    />
                  )}
                />
              </FormControl>
              {errors.title && (
                <FormHelperText
                  id=''
                  sx={{
                    mx: 0,
                    color: 'error.main',
                    fontSize: theme => theme.typography.body2.fontSize
                  }}
                >
                  Role Name is required
                </FormHelperText>
              )}
            </Box>
            <Typography variant='h4'>Role Permissions</Typography>
            {errors.permissionDetails && (
              <FormHelperText
                id=''
                sx={{
                  mx: 0,
                  color: 'error.main',
                  fontSize: theme => theme.typography.body2.fontSize
                }}
              >
                {errors.permissionDetails.message}
              </FormHelperText>
            )}
            {/* =========================================================== */}
            <ModuleContainer
              errors={errors}
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
            />
            {/* =========================================================== */}
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Box className='demo-space-x'>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
              <Button color='secondary' variant='tonal' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default RolesCards
