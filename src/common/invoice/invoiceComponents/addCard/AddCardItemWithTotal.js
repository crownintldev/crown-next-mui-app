// ** MUI Imports

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import { currencyFormatter } from 'src/utils/helperfunction';

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}));

const AddCardItemWithTotal = ({ data, invoiceDataArray }) => {
  let total = 0,
    paid = 0,
    remaining = 0,
    discount = 0;

  // console.log(data)

  // ** Hook
  const visaBookingIds =
    data?.length > 0 ? data.flatMap(({ visaBookingIds }) => visaBookingIds) : [];
console.log(invoiceDataArray)
  // calculating total Invoices
  invoiceDataArray &&
    invoiceDataArray.map((feeItem) => {
      total += feeItem?.subTotal;
      paid += feeItem?.paid;
      remaining += feeItem?.remaining;
      discount += feeItem?.discount;
    });

  return (
    <Grid container xl={{ mb: 5 }} xs={{ mb: 5 }} sx={{ mb: 5 }}>
      <Grid item xs={12} sm={7} lg={6} sx={{ order: { sm: 1, xs: 2 } }}>
        {visaBookingIds?.length > 0 &&
          visaBookingIds.map((item, index) => {
            return (
              <Box className='flex space-x-2' key={index}>
                {index + 1}: &nbsp; <p>Passport#: {item?.passport?.passportNumber}</p>
                <p>
                  {`${
                    item?.confirmed ? `Confirmed Fees: ${item?.confirmed.totalFee}` : ''
                  }`}
                  {`${
                    item?.processing?.processingFee
                      ? `Processing Fees: ${item?.processing?.processingFee}, Visa Fee: ${item?.processing?.visaFee}`
                      : ''
                  }`}
                </p>
              </Box>
            );
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
            <Typography sx={{ color: 'text.secondary' }}>Total: </Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {currencyFormatter(total, 'PKR')}
            </Typography>
          </CalcWrapper>
          <CalcWrapper>
            <Typography sx={{ color: 'text.secondary' }}>Paid: </Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {currencyFormatter(paid, 'PKR')}
            </Typography>
          </CalcWrapper>
          <CalcWrapper sx={{ mb: '0 !important' }}>
            <Typography sx={{ color: 'text.secondary' }}>Remaining: </Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {currencyFormatter(remaining, 'PKR')}
            </Typography>
          </CalcWrapper>
          <CalcWrapper sx={{ mb: '0 !important' }}>
            <Typography sx={{ color: 'text.secondary' }}>Discount</Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {' '}
              {currencyFormatter(discount || 0, 'PKR')}
            </Typography>
          </CalcWrapper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddCardItemWithTotal;
