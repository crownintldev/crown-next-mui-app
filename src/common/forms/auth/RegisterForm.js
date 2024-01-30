import React, { useState } from 'react'
import Link from 'next/link'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import { styled, useTheme } from '@mui/material/styles'

// MuiComponent
import { Box } from '@mui/system'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

// yup schema
const schema = yup.object().shape({
  username:yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(3).required()
})

const defaultValues = {
  username: '',
  password: '',
  email: ''
}

const RegisterForm = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const auth = useAuth()
  const theme = useTheme()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const { username, email, password } = data
    auth.register({ username,email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  return (
    <div>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='username'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              autoFocus
              label='Username'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='jiay bhutto'
              error={Boolean(errors.username)}
              {...(errors.username && { helperText: errors.username.message })}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              autoFocus
              label='Email'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder='Enter Your Valid Email'
              error={Boolean(errors.email)}
              {...(errors.email && { helperText: errors.email.message })}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              value={value}
              onBlur={onBlur}
              label='Password'
              onChange={onChange}
              placeholder='Enter Password'
              id='auth-login-v2-password'
              error={Boolean(errors.password)}
              {...(errors.password && { helperText: errors.password.message })}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon
                        fontSize='1.25rem'
                        icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'}
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
        {/* <FormControlLabel
          control={<Checkbox />}
          sx={{
            mb: 4,
            mt: 1.5,
            '& .MuiFormControlLabel-label': { fontSize: theme.typography.body2.fontSize }
          }}
          label={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <Typography sx={{ color: 'text.secondary' }}>I agree to</Typography>
              <Typography
                component={LinkStyled}
                href='/'
                onClick={e => e.preventDefault()}
                sx={{ ml: 1 }}
              >
                privacy policy & terms
              </Typography>
            </Box>
          }
        /> */}
        <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
          Sign up
        </Button>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
          <Typography component={LinkStyled} href='/login'>
            Sign in instead
          </Typography>
        </Box>
        <Divider
          sx={{
            color: 'text.disabled',
            '& .MuiDivider-wrapper': { px: 6 },
            fontSize: theme.typography.body2.fontSize,
            my: theme => `${theme.spacing(6)} !important`
          }}
        >
          or
        </Divider>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton
            href='/'
            component={Link}
            sx={{ color: '#497ce2' }}
            onClick={e => e.preventDefault()}
          >
            <Icon icon='mdi:facebook' />
          </IconButton>
          <IconButton
            href='/'
            component={Link}
            sx={{ color: '#1da1f2' }}
            onClick={e => e.preventDefault()}
          >
            <Icon icon='mdi:twitter' />
          </IconButton>
          <IconButton
            href='/'
            component={Link}
            onClick={e => e.preventDefault()}
            sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
          >
            <Icon icon='mdi:github' />
          </IconButton>
          <IconButton
            href='/'
            component={Link}
            sx={{ color: '#db4437' }}
            onClick={e => e.preventDefault()}
          >
            <Icon icon='mdi:google' />
          </IconButton>
        </Box>
      </form>
    </div>
  )
}

export default RegisterForm
