// *** React Import
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

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
import axiosInstance from 'src/utils/axiosInstance'
import toast from 'react-hot-toast'

// Other Imports
import ActionsHandlers from './ActionsHandlers'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { axiosErrorMessage } from 'src/utils/helperfunction'

const OptionsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const AddActions = ({ cardHeader, invoiceDataArray,invoiceNumber,invoiceEditId }) => {
  const router = useRouter()
  const { detail, issueDate, dueDate, setIssueDate, setDueDate } = cardHeader
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // console.log(invoiceDataArray)
  const paymentMethods = [
    { name: 'Bank Transfer' },
    { name: 'Debit Card' },
    { name: 'Credit Card' },
    { name: 'Cash' }
  ]

  const defaultProps = {
    options: paymentMethods,
    getOptionLabel: (option) => option.name
  }

  const handleInvoiceStore = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    const initialTotals = { total: 0, paid: 0, remaining: 0, discount: 0 }

    
    // const billing = invoiceDataArray.reduce((acc, feeItem) => {
    //   acc.total += feeItem?.subTotal
    //   acc.paid += feeItem?.paid
    //   acc.remaining += feeItem?.remaining
    //   acc.discount += feeItem?.discount ?? 0
    //   return acc
    // }, initialTotals)
    // const members = invoiceDataArray.map((item) => item.by?.fullName ?? item.by?.companyName)
    // const axiosBody={
    //   invoiceDataArray,
    //   members,
    //   billing,
    //   detail,
    //   issueDate,
    //   dueDate
    // }
    // console.log("axiosBody",axiosBody)
    const apiRequest = invoiceEditId ? 
    await axiosInstance.put(`${process.env.NEXT_PUBLIC_API}/invoice/update/${invoiceEditId}`, axiosBody)
    :
    await axiosInstance.post(`${process.env.NEXT_PUBLIC_API}/invoice/create`, axiosBody)
    try {
      const response = apiRequest
      toast.success(`Invoice ${invoiceEditId?"Update":"Create"} Successfully`, {
        position: 'top-center'
      })
      invoiceEditId && router.push("/accounts/invoice/list")
    } catch (err) {
      toast.error(axiosErrorMessage(err), { position: 'top-center' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenPreviewModal = () => {
    // Set the state to close the modal
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
            <Button
              fullWidth
              variant='contained'
              sx={{ mb: 2, '& svg': { mr: 2 } }}
              onClick={handleInvoiceStore}
            >
              <Icon fontSize='1.125rem' icon='tabler:send' />
              {invoiceEditId?"Update Invoice" : "Store Invoice"} 
            </Button>
            <Button
              fullWidth
              variant='contained'
              sx={{ mb: 2, '& svg': { mr: 2 } }}
              onClick={handleOpenPreviewModal}
            >
              <Icon fontSize='1.125rem' icon='tabler:submit' />
              Preview
            </Button>

            {/* Render the preview modal */}
            {/* <ActionsHandlers
              open={isPreviewModalOpen}
              onClose={handleClosePreviewModal}
              invoiceDataArray={invoiceDataArray}
              cardHeader={cardHeader}
              invoiceNumber={invoiceNumber}
            /> */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1} sx={{ width: 300, mb: 2 }}>
          <Autocomplete
            {...defaultProps}
            id='payment-methods'
            clearOnEscape
            renderInput={(params) => (
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
