import React from 'react'
import { Controller } from 'react-hook-form'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import { styled } from '@mui/system'
import { useTheme } from '@mui/system'

export const MuiTextAreaHookField = ({ control, errors,name }) => {
  const theme = useTheme()
  const Textarea = styled(BaseTextareaAutosize)`
    width: 100%;
    padding: 15.5px 13px;
    border-radius: 8px;
    border: 1px solid rgba(${theme.palette.customColors.main}, 0.2);
    background-color: transparent !important;
    transition: ${theme.transitions.create(['border-color', 'box-shadow'], {
      duration: theme.transitions.duration.shorter
    })};
    color: ${theme.palette.text.secondary};

    &:hover {
      border-color: rgba(${theme.palette.customColors.main}, 0.28);
    }

    &:focus {
      outline: none;
      box-shadow: ${theme.shadows[2]};
      border-color: ${theme.palette.primary.main};
    }

    &::placeholder {
      transition: ${theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter
      })};
      color: ${theme.palette.text.secondary};
    }

    // Add any additional styles you need from TextFieldStyled here
  `

  return (
    <Textarea
      maxRows={4}
      control={control}
      aria-label='maximum height'
      placeholder='Maximum 4 rows'
      defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      render={({ field: { value, onChange } }) => (
        value={value}
        onChange={onChange}
        error={Boolean(errors[name])}
            helperText={errors[name]?.message || ''}
      )}

    />
  )
}
