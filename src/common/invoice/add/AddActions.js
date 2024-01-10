// *** React Import
import React, { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField' // Replace with CustomTextField if needed
// ... other necessary imports

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const OptionsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const AddActions = () => {
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer')
  const [action, setActions] = useState('pdf')

  const handlePaymentMethodChange = event => {
    setPaymentMethod(event.target.value)
  }
  const handleActionMethodChange = event => setActions(event.target.value)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
              <Icon fontSize='1.125rem' icon='tabler:send' />
              Send Invoice
            </Button>
            <CustomTextField
              select
              fullWidth
              label='Set Action'
              value={action}
              onChange={handleActionMethodChange}
              sx={{
                mb: 4,
                '& .MuiInputLabel-root': {
                  fontSize: theme => theme.typography.body1.fontSize,
                  lineHeight: theme => theme.typography.body1.lineHeight
                }
              }}
            >
              <MenuItem value='pdf'>Generate PDF</MenuItem>
              <MenuItem value='preview'>Preview</MenuItem>
              <MenuItem value='print'>Print Out</MenuItem>
              <MenuItem value='screenshot'>Take Screenshot</MenuItem>
            </CustomTextField>
            <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
              <Icon fontSize='1.125rem' icon='tabler:submit' />
              Action
            </Button>

            <Button
              fullWidth
              sx={{ mb: 2 }}
              variant='tonal'
              component={Link}
              color='secondary'
              href='/apps/invoice/preview/4987'
            >
              Preview
            </Button>
            <Button fullWidth variant='tonal' color='secondary'>
              Save
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          select
          fullWidth
          label='Payment method via'
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          sx={{
            mb: 4,
            '& .MuiInputLabel-root': {
              fontSize: theme => theme.typography.body1.fontSize,
              lineHeight: theme => theme.typography.body1.lineHeight
            }
          }}
        >
          <MenuItem value='Bank Transfer'>Bank Transfer</MenuItem>
          <MenuItem value='Debit Card'>Debit Card</MenuItem>
          <MenuItem value='Credit Card'>Credit Card</MenuItem>
          <MenuItem value='Cash'>Cash</MenuItem>
        </CustomTextField>  

        {paymentMethod !== 'Bank Transfer' && (
          <Box>
            <TextField fullWidth label='Title' sx={{ mb: 2 }} />
            <TextField fullWidth label='Description' multiline rows={4} sx={{ mb: 2 }} />
            <Button variant='contained' component='label' sx={{ mb: 2 }}>
              Upload File
              <input type='file' hidden />
            </Button>
          </Box>
        )}

        <OptionsWrapper>
          <InputLabel
            sx={{ cursor: 'pointer', lineHeight: 1.467 }}
            htmlFor='invoice-add-payment-terms'
          >
            Payment Terms
          </InputLabel>
          <Switch defaultChecked id='invoice-add-payment-terms' />
        </OptionsWrapper>
        <OptionsWrapper>
          <InputLabel
            sx={{ cursor: 'pointer', lineHeight: 1.467 }}
            htmlFor='invoice-add-client-notes'
          >
            Client Notes
          </InputLabel>
          <Switch id='invoice-add-client-notes' />
        </OptionsWrapper>
        <OptionsWrapper>
          <InputLabel
            sx={{ cursor: 'pointer', lineHeight: 1.467 }}
            htmlFor='invoice-add-payment-stub'
          >
            Payment Stub
          </InputLabel>
          <Switch id='invoice-add-payment-stub' />
        </OptionsWrapper>
      </Grid>
    </Grid>
  )
}

export default AddActions
