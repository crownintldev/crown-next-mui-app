import { useState } from 'react'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import FormControl from '@mui/material/FormControl'
import { Controller } from 'react-hook-form'
import { FormControlLabel, FormHelperText, RadioGroup } from '@mui/material'

const DialogUseCase = ({ value, setValue, errors, control, customErr }) => {
  const useCaseOptions = [
    {
      name: 'Cloud Base',
      description: 'Purely cloud & online experience',
      value: 'cloudBase',
      icon: 'tabler:brand-react',
      color: 'info'
    },
    {
      name: 'Desktop Synchronize',
      description: 'Cloud Database & local experience',
      value: 'desktopSynchronize',
      icon: 'tabler:brand-angular',
      color: 'error'
    },
    {
      name: 'Desktop App',
      description: 'Purely Desktop ( Software + Database ) experience',
      value: 'desktopApp',
      icon: 'tabler:brand-vue',
      color: 'success'
    }
  ]

  return (
    <div>
      <Typography variant='h5' sx={{ mb: 4 }}>
        Select Use Case
      </Typography>
      <FormControl error={Boolean(errors.selectedUseCase)} sx={{ width: '100%' }}>
        <Controller
          name='selectedUseCase'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup
              row
              {...field}
              name='selectedUseCase'
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {useCaseOptions.map(option => (
                <Box
                  key={option.value}
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
                      color={option.color}
                      variant='rounded'
                      sx={{ mr: 3, width: 48, height: 48 }}
                    >
                      <Icon icon={option.icon} />
                    </CustomAvatar>
                    <div>
                      <Typography>
                        {option.name}
                        {option.label && (
                          <Typography>
                            <Chip
                              size='small'
                              label={option.label}
                              color={option.badgeColor || 'primary'}
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
                        {option.description}
                      </Typography>
                    </div>
                  </Box>
                  <FormControlLabel
                    value={!option.disabled && option.value}
                    disabled={option.disabled}
                    onClick={() => {
                      if (!option.disabled) {
                        setValue(option.value)
                      }
                    }}
                    // label='Female'
                    sx={errors.selectedUseCase ? { color: 'error.main' } : null}
                    control={<Radio sx={errors.selectedUseCase ? { color: 'error.main' } : null} />}
                  />
                  {/* <Radio
                    value={option.value}
                    onChange={handleChange}
                    checked={value === option.value}
                  /> */}
                </Box>
              ))}
            </RadioGroup>
          )}
        />
        {(errors.selectedUseCase || customErr) && (
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

      {/* =================== */}
      {/* <Box sx={{ mb: 8 }}>
        {useCaseOptions.map(option => (
          <Box
            key={option.value}
            onClick={() => setValue(option.value)}
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
                color={option.color}
                variant='rounded'
                sx={{ mr: 3, width: 48, height: 48 }}
              >
                <Icon icon={option.icon} />
              </CustomAvatar>
              <div>
                <Typography>
                  {option.name}
                  {option.label && (
                    <Typography>
                      <Chip
                        size='small'
                        label={option.label}
                        color={option.badgeColor || 'primary'}
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
                  {option.description}
                </Typography>
              </div>
            </Box>
            <Radio value={option.value} onChange={handleChange} checked={value === option.value} />
          </Box>
        ))}
      </Box> */}
    </div>
  )
}

export default DialogUseCase
