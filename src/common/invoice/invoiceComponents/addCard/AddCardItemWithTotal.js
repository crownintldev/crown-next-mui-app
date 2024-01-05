// ** React Imports
import { useState } from 'react'

// ** MUI Imports

import Divider from '@mui/material/Divider'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { styled, alpha, useTheme } from '@mui/material/styles'

import CustomTextField from 'src/@core/components/mui/text-field'

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const AddCardItemWithTotal = ({ data, invoiceNumber, invoiceData }) => {
  const { accountDetails, grandFee } = invoiceData
  console.log(data)
  // ** Hook
  const theme = useTheme()
  const visaBookingIds =
    data?.length > 0 ? data.flatMap(({ visaBookingIds }) => visaBookingIds) : []

  return (
    <Grid container>
      <Grid item xs={12} sm={7} lg={6} sx={{ order: { sm: 1, xs: 2 } }}>
        {/* <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
            Salesperson:
          </Typography>
          <CustomTextField fullWidth defaultValue='Tommy Shelby' />
        </Box> */}
        {/* <CustomTextField fullWidth placeholder='Thanks for your business' /> */}
        {visaBookingIds?.length > 0 &&
          visaBookingIds.map((item, index) => {
            return (
              <Box className='flex space-x-2' key={index}>
                {index + 1}: &nbsp; <p>Passport#: {item?.passportId?.passportNumber}</p>
                <p>
                  {`${item.confirmed ? `Confirmed Fees: ${item.confirmed.totalFee}` : ''}`}
                  {`${
                    item?.processing?.processingFee
                      ? `Processing Fees: ${item.processing.processingFee}, Visa Fee: ${item.processing.visaFee}`
                      : ''
                  }`}
                </p>
              </Box>
            )
          })}
      </Grid>
      <Grid
        item
        xs={12}
        sm={5}
        lg={6}
        sx={{
          mb: { sm: 0, xs: 4 },
          order: { sm: 2, xs: 1 },
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Box sx={{ minWidth: 150, '& > *': { width: '100%' } }}>
          <CalcWrapper>
            <Typography sx={{ color: 'text.secondary' }}>Subtotal:</Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Rs {data[0]?.fee?.total}
            </Typography>
          </CalcWrapper>
          <CalcWrapper>
            <Typography sx={{ color: 'text.secondary' }}>Total Paid:</Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Rs {data[0]?.fee?.paid}
            </Typography>
          </CalcWrapper>
          <CalcWrapper sx={{ mb: '0 !important' }}>
            <Typography sx={{ color: 'text.secondary' }}>Total Due</Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Rs {data[0]?.fee?.remaining}
            </Typography>
          </CalcWrapper>
          <CalcWrapper sx={{ mb: '0 !important' }}>
            <Typography sx={{ color: 'text.secondary' }}>Discount</Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Rs {data[0]?.fee?.discount}
            </Typography>
          </CalcWrapper>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AddCardItemWithTotal
