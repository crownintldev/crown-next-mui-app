import React from 'react'
import { Controller } from 'react-hook-form'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import { styled } from '@mui/system'

export const MuiTextAreaHookField = ({ control, errors, name, placeholder, rows }) => {
  // const theme = useTheme()
  const StyledTextarea = styled(BaseTextareaAutosize)(({ theme }) => ({
    width: '100%',
    padding: '15.5px 13px',
    borderRadius: '8px',
    border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
    backgroundColor: 'transparent',
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      duration: theme.transitions.duration.shorter
    }),
    color: theme.palette.text.secondary,

    '&:hover': {
      borderColor: `rgba(${theme.palette.customColors.main}, 0.28)`
    },

    '&:focus': {
      outline: 'none',
      boxShadow: theme.shadows[2],
      borderColor: theme.palette.primary.main
    },

    '&::placeholder': {
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter
      }),
      color: theme.palette.text.secondary
    }
  }))
  const isError = Boolean(errors[name]);
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <StyledTextarea
            maxRows={rows || 4}
            aria-label='maximum height'
            placeholder={placeholder}
            {...field}
            error={isError}
          />
        )}
      />
      {isError && <p style={{ color: theme.palette.error.main }}>{errors[name].message}</p>}
    </>
  )
}
