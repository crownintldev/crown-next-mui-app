// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'

import { top100Films } from 'src/@fake-db/autocomplete'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Autocomplete, TextField } from '@mui/material'

const CustomInput = forwardRef(({ ...props }, ref) => {
  return (
    <CustomTextField
      fullWidth
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' } }}
      {...props}
    />
  )
})

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  '&:not(:last-child)': {
    paddingRight: `${theme.spacing(2)} !important`
  }
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

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

const CustomSelectItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'transparent !important',
  '&:hover': {
    color: `${theme.palette.success.main} !important`,
    backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important`
  },
  '&.Mui-focusVisible': {
    backgroundColor: `${alpha(theme.palette.success.main, 0.2)} !important`
  },
  '&.Mui-selected': {
    color: `${theme.palette.success.contrastText} !important`,
    backgroundColor: `${theme.palette.success.main} !important`,
    '&.Mui-focusVisible': {
      backgroundColor: `${theme.palette.success.dark} !important`
    }
  }
}))
const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const AddCardHeader = ({ invoiceNumber }) => {
  const [issueDate, setIssueDate] = useState(new Date())
  const [dueDate, setDueDate] = useState(new Date(tomorrowDate))

  // ** Hook
  const theme = useTheme()

  return (
    <Grid container>
      <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
            <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              />
            </svg>
            <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <div>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              Office 149, 450 South Brand Brooklyn
            </Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              San Diego County, CA 91905, USA
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              +1 (123) 456 7891, +44 (876) 543 2198
            </Typography>
          </div>
        </Box>
      </Grid>
      <Grid item xl={6} xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xl: 'flex-end', xs: 'flex-start' }
          }}
        >
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h4' sx={{ mr: 2, width: '105px' }}>
              Invoice
            </Typography>
            <CustomTextField
              fullWidth
              value={invoiceNumber}
              sx={{ width: { sm: '250px', xs: '170px' } }}
              InputProps={{
                disabled: true,
                startAdornment: <InputAdornment position='start'>#</InputAdornment>
              }}
            />
          </Box>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>
              Date Issued:
            </Typography>
            <DatePicker
              id='issue-date'
              selected={issueDate}
              customInput={<CustomInput />}
              onChange={date => setIssueDate(date)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>
              Date Due:
            </Typography>
            <DatePicker
              id='due-date'
              selected={dueDate}
              customInput={<CustomInput />}
              onChange={date => setDueDate(date)}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AddCardHeader
