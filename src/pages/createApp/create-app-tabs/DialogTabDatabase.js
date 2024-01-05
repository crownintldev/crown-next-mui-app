// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Button, FormControl, FormControlLabel, FormHelperText, RadioGroup } from '@mui/material'
import Chip from 'src/@core/components/mui/chip'
import { Controller } from 'react-hook-form'

const TabDatabase = ({
  useCaseValue,
  setUseCaseValue,
  value,
  setValue,
  control,
  errors,
  customErr
}) => {
  const handleChange = event => {
    setValue(event.target.value)
  }
  const dataArray = [
    {
      id: 0,
      title: 'MongoDB',
      extraLabel: 'Default',
      value: 'mongodb',
      icon: 'tabler:brand-firebase',
      desc: 'Fast & scalable atlas cloud',
      color: 'info'
    },
    {
      id: 1,
      title: 'SQL Database',
      extraLabel: 'Manual',
      value: 'sqlDb',
      icon: 'tabler:brand-amazon',
      desc: 'Connect any SQL database',
      color: 'warning',
      disabled: true,
      label: 'coming soon',
      badgeColor: 'error'
    },
    {
      id: 2,
      title: 'Serverless Cloud',
      extraLabel: 'Manual',
      value: 'serverlessCloud',
      icon: 'tabler:brand-firebase',
      desc: 'Serverless database e.g ( Supabase , AppWrite... ',
      color: 'success',
      disabled: true,
      label: 'coming soon',
      badgeColor: 'error'
    }
  ]

  return (
    <>
      {useCaseValue !== 'desktopApp' ? (
        <>
          {/* <Controller
            name='databaseName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                sx={{ mb: 4 }}
                value={value}
                label='Database Name'
                onChange={onChange}
                placeholder='e.g travokey_database1234'
                error={Boolean(errors.databaseName)}
                aria-describedby='validation-basic-first-name'
                {...(errors.databaseName && { helperText: 'Database Name is required' })}
              />
            )}
          /> */}
          {/* <CustomTextField
            fullWidth
            sx={{ mb: 4 }}
            label='Database Name'
            placeholder='e.g travokey_database1234'
          /> */}

          <Typography variant='h5' sx={{ mb: 4 }}>
            Select Database Engine
          </Typography>
          <FormControl error={Boolean(errors.selectedDatabase)} sx={{ width: '100%' }}>
            <Controller
              name='selectedDatabase'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  name='selectedDatabase'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {dataArray.map((item, index) => (
                    <Box
                      key={index}
                      // onClick={() => setValue('laboratoryApp')}
                      sx={{
                        cursor: 'pointer',
                        mb: 6,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: item.value !== 'mongodb' ? 'text.secondary' : 'inherit' // Secondary color for non-selected items
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar
                          skin='light'
                          color={item.color || 'info'}
                          variant='rounded'
                          sx={{ mr: 3, width: 48, height: 48 }}
                        >
                          <Icon icon={item.icon || 'tabler:database'} />
                        </CustomAvatar>
                        <div>
                          <Typography sx={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            {item.title || 'Label'}
                            <Typography sx={{ fontSize: '12px', color: 'grey', fontWeight: '700' }}>
                              ( {item.extraLabel || 'Label'} )
                            </Typography>
                            {item.label && (
                              <Typography>
                                <Chip
                                  size='small'
                                  label={item.label || 'label'}
                                  color={item.badgeColor || 'primary'}
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
                          <Typography variant='body2'>{item.desc || 'description'}</Typography>
                        </div>
                      </Box>
                      <FormControlLabel
                        value={!item.disabled && item.value}
                        disabled={item.value !== 'mongodb' ? true : false} // Disable all except MongoDB
                        onClick={() => {
                          if (!item.disabled) {
                            setValue(item.value)
                          }
                        }}
                        // label='Female'
                        sx={errors.selectedDatabase ? { color: 'error.main' } : null}
                        control={
                          <Radio sx={errors.selectedDatabase ? { color: 'error.main' } : null} />
                        }
                      />
                      {/* <Radio
                        value={item.value}
                        disabled={item.value !== 'mongodb'} // Disable all except MongoDB
                        checked={value === item.value}
                      /> */}
                    </Box>
                  ))}
                </RadioGroup>
              )}
            />
            {(errors.selectedDatabase || customErr) && (
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
          {/* =========== */}
          {/* <Box sx={{ mb: 8 }}>
            {dataArray.map((item, index) => (
              <Box
                key={index}
                // onClick={() => setValue('laboratoryApp')}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                  color: item.value !== 'mongodb' ? 'text.secondary' : 'inherit' // Secondary color for non-selected items
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar
                    skin='light'
                    color={item.color || 'info'}
                    variant='rounded'
                    sx={{ mr: 3, width: 48, height: 48 }}
                  >
                    <Icon icon={item.icon || 'tabler:database'} />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      {item.title || 'Label'}
                      <Typography sx={{ fontSize: '12px', color: 'grey', fontWeight: '700' }}>
                        ( {item.extraLabel || 'Label'} )
                      </Typography>
                      {item.label && (
                        <Typography>
                          <Chip
                            size='small'
                            label={item.label || 'label'}
                            color={item.badgeColor || 'primary'}
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
                    <Typography variant='body2'>{item.desc || 'description'}</Typography>
                  </div>
                </Box>
                <Radio
                  value={item.value}
                  disabled={item.value !== 'mongodb'} // Disable all except MongoDB
                  checked={value === item.value}
                />
              </Box>
            ))}
          </Box> */}
        </>
      ) : (
        <>
          <Typography variant='h4' sx={{ mb: 1 }}>
            Generate The Key
          </Typography>
          <Typography variant='h6' sx={{ mb: 4 }}>
            copy and save the key for verify and install your app
          </Typography>
          <Box sx={{ my: 10 }}>
            <CustomTextField
              fullWidth
              disabled={true}
              // sx={{ mb: 4 }}
              label='Verification Key'
              placeholder='Copy the Verification Key'
            />
            <Box
              sx={{
                my: 8,
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Button variant='contained'>Generate Key</Button>
              <Button variant='text' startIcon={<Icon fontSize='1rem' icon={'tabler:copy'} />}>
                Copy
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default TabDatabase
