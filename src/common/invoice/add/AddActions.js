// *** React Import
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

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
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'

// Other Imports
import ActionsHandlers from './ActionsHandlers'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const OptionsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const AddActions = () => {
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false)
  const invoiceDataArray = useSelector(state => state.myInvoice.data)

  const paymentMethods = [
    { name: 'Bank Transfer' },
    { name: 'Debit Card' },
    { name: 'Credit Card' },
    { name: 'Cash' }
  ]

  const defaultProps = {
    options: paymentMethods,
    getOptionLabel: option => option.name
  }

  const handleActionMethodChange = () => {
    // Set the state to open the modal
    setPreviewModalOpen(true)
  }

  const handleClosePreviewModal = () => {
    // Set the state to close the modal
    setPreviewModalOpen(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
              <Icon fontSize='1.125rem' icon='tabler:send' />
              Send Invoice
            </Button>
            <Button
              fullWidth
              variant='contained'
              sx={{ mb: 2, '& svg': { mr: 2 } }}
              onClick={handleActionMethodChange}
            >
              <Icon fontSize='1.125rem' icon='tabler:submit' />
              Preview
            </Button>

            {/* Render the preview modal */}
            <ActionsHandlers
              open={isPreviewModalOpen}
              onClose={handleClosePreviewModal}
              data={invoiceDataArray}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1} sx={{ width: 300, mb: 2 }}>
          <Autocomplete
            {...defaultProps}
            id='payment-methods'
            clearOnEscape
            renderInput={params => (
              <TextField {...params} label='Select your payment' variant='standard' />
            )}
          />
        </Stack>

        {paymentMethod !== null && (
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
