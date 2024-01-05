import { useState } from 'react'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Chip from 'src/@core/components/mui/chip'
import FormControl from '@mui/material/FormControl'
import { Controller } from 'react-hook-form'
import { FormControlLabel, FormHelperText, RadioGroup } from '@mui/material'

const DialogAppSelection = ({ value, setValue, errors, control, customErr }) => {
  const appOptions = [
    {
      name: 'Accounts Software',
      description: 'Scales with any business',
      value: 'accountsApp',
      icon: 'tabler:briefcase',
      color: 'info'
    },
    {
      name: 'Airline Tickets Software',
      description: 'Grow with Airline Tickets Software',
      value: 'ticketingApp',
      icon: 'tabler:shopping-cart',
      color: 'success'
    },
    {
      name: 'Laboratory Software',
      description: 'Scale your medical business',
      value: 'laboratoryApp',
      icon: 'tabler:award',
      color: 'error',
      disabled: true,
      label: 'coming soon',
      badgeColor: 'error'
    }
  ]

  return (
    <div>
      <Typography variant='h5' sx={{ mb: 4 }}>
        Travokey Apps
      </Typography>
      <FormControl error={Boolean(errors.selectedApp)} sx={{ width: '100%' }}>
        {/* <FormLabel>Gender</FormLabel> */}
        <Controller
          name='selectedApp'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup
              row
              {...field}
              name='selectedApp'
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {appOptions.map(app => (
                <Box
                  key={app.index}
                  sx={{
                    mb: 6,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar
                      skin='light'
                      color={app.color}
                      variant='rounded'
                      sx={{ mr: 3, width: 48, height: 48 }}
                    >
                      <Icon icon={app.icon} />
                    </CustomAvatar>
                    <div>
                      <Typography
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '4px'
                        }}
                      >
                        {app.name}
                        {app.label && (
                          <Typography>
                            <Chip
                              size='small'
                              label={app.label}
                              color={app.badgeColor || 'primary'}
                              sx={{
                                mr: 2,
                                height: 20,
                                minWidth: 22,
                                '& .MuiChip-label': { px: 4, textTransform: 'capitalize' }
                              }}
                            />
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                        {app.description}
                      </Typography>
                    </div>
                  </Box>

                  <FormControlLabel
                    value={!app.disabled && app.value}
                    disabled={app.disabled}
                    onClick={() => {
                      if (!app.disabled) {
                        setValue(app.value)
                      }
                    }}
                    // label='Female'
                    sx={errors.selectedApp ? { color: 'error.main' } : null}
                    control={<Radio sx={errors.selectedApp ? { color: 'error.main' } : null} />}
                  />
                </Box>
              ))}

              {/* <FormControlLabel
                value='female'
                label='Female'
                sx={errors.radio ? { color: 'error.main' } : null}
                control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
              />
              <FormControlLabel
                value='male'
                label='Male'
                sx={errors.radio ? { color: 'error.main' } : null}
                control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
              />
              <FormControlLabel
                value='other'
                label='Other'
                sx={errors.radio ? { color: 'error.main' } : null}
                control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
              /> */}
            </RadioGroup>
          )}
        />
        {(errors.selectedApp || customErr) && (
          <FormHelperText
            id='validation-basic-radio'
            sx={{
              mx: 0,
              color: 'error.main',
              fontSize: theme => theme.typography.body2.fontSize
            }}
          >
            This field is required
          </FormHelperText>
        )}
      </FormControl>
      {/* ======================== */}
      {/* <Box sx={{ mb: 8 }}>
        {appOptions.map(app => (
          <Box
            onClick={() => {
              if (!app.disabled) {
                setValue(app.value)
              }
            }}
            key={app.value}
            sx={{
              mb: 6,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar
                skin='light'
                color={app.color}
                variant='rounded'
                sx={{ mr: 3, width: 48, height: 48 }}
              >
                <Icon icon={app.icon} />
              </CustomAvatar>
              <div>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '4px'
                  }}
                >
                  {app.name}
                  {app.label && (
                    <Typography>
                      <Chip
                        size='small'
                        label={app.label}
                        color={app.badgeColor || 'primary'}
                        sx={{
                          mr: 2,
                          height: 20,
                          minWidth: 22,
                          '& .MuiChip-label': { px: 4, textTransform: 'capitalize' }
                        }}
                      />
                    </Typography>
                  )}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                  {app.description}
                </Typography>
              </div>
            </Box>
            <Radio
              value={!app.disabled && app.value}
              disabled={app.disabled}
              checked={!app.disabled && value === app.value}
            />
          </Box>
        ))}
      </Box> */}
    </div>
  )
}

export default DialogAppSelection
