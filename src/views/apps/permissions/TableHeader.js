// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress, MenuItem } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPermission,
  fetchModules,
  setMessage,
  setSuccess
} from 'src/store/apps/role&permissions'

const TableHeader = props => {
  let auth = useAuth()
  const dispatch = useDispatch()
  const { modules } = useSelector(state => state.permissions)
  const { spinner, success, message } = useSelector(state => state.permissions)
  // ** Props
  const { value, handleFilter } = props

  // ** State
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => {
    setOpen(!open)
    reset()
    dispatch(setMessage(''))
  }
  const onSubmit = async data => {
    dispatch(
      addPermission({ values: data, token: auth.user.token, recordName: 'permissionDetails' })
    )
    // setOpen(false)
    // e.preventDefault()
  }
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    module: yup.string().required()
  })
  const defaultValues = {
    name: '',
    description: '',
    module: ''
  }
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (open) {
      const data = {
        query: 'all'
        // Include other properties as needed
      }
      dispatch(fetchModules({ data, token: auth.user.token, recordName: 'modules' }))
    }
  }, [open])
  useEffect(() => {
    if (success) {
      // Close the modal and reset success state
      reset()
      setOpen(false)
      dispatch(setSuccess(false))
    }
  }, [success, dispatch])

  return (
    <>
      <Box
        sx={{
          p: 5,
          pb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <CustomTextField
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Permission'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
          Add Permission
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle
          component='div'
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h3' sx={{ mb: 2 }}>
            Add New Permission
          </Typography>
          <Typography color='text.secondary'>
            Permissions you may use and assign to your users.
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box
              // component='form'
              // onSubmit={e => onSubmit(e)}
              sx={{
                mt: 4,
                mx: 'auto',
                width: '100%',
                maxWidth: 360,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ mb: 4, width: '100%', display: 'flex' }}>
                <Controller
                  // disabled={auth.spinner}
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Permission Name'
                      // disabled={auth.spinner}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Enter Permission Name'
                      error={Boolean(errors.name)}
                      {...(errors.name && { helperText: errors.name.message })}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 4, width: '100%', display: 'flex' }}>
                <Controller
                  // disabled={auth.spinner}
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Description Name'
                      // disabled={auth.spinner}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Enter Description'
                      error={Boolean(errors.description)}
                      {...(errors.description && { helperText: errors.description.message })}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 4, width: '100%', display: 'flex' }}>
                <Controller
                  name='module'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ textTransform: 'capitalize' }}
                      select
                      fullWidth
                      defaultValue='select'
                      label='Module'
                      placeholder='Select Module'
                      SelectProps={{
                        value: value,
                        onChange: e => onChange(e)
                      }}
                      id=''
                      error={Boolean(errors.select)}
                      aria-describedby=''
                      {...(errors.module && { helperText: 'This field is required' })}
                    >
                      <MenuItem disabled>Select Module</MenuItem>
                      {modules &&
                        modules.map((item, index) => (
                          <MenuItem
                            sx={{ textTransform: 'capitalize' }}
                            key={index}
                            value={item._id}
                          >
                            {item.title}
                          </MenuItem>
                        ))}
                    </CustomTextField>
                  )}
                />
              </Box>
              <Box sx={{ width: '100%', display: 'flex' }}>
                <Typography sx={{ color: 'red' }}>{message}</Typography>
              </Box>
              <Box className='demo-space-x' sx={{ '& > :last-child': { mr: '0 !important' } }}>
                <Button type='submit' disabled={spinner} variant='contained'>
                  Create Permission
                  {spinner && (
                    <CircularProgress
                      sx={{
                        color: 'common.white',
                        width: '20px !important',
                        height: '20px !important',
                        mr: theme => theme.spacing(4)
                      }}
                    />
                  )}
                </Button>
                <Button type='reset' variant='tonal' color='secondary' onClick={handleDialogToggle}>
                  Discard
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableHeader
