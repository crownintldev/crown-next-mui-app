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

const AddCardItemWithTotal = ({ invoiceData }) => {
  const { account, ticket } = invoiceData;
  let total = 0,
    paid = 0,
    remaining = 0,
    ticketProfit = 0,
    ticketDiscount = 0,
    ticketCost = 0;
  // console.log(data)

  // ** Hook
  // const visaBookingIds =
  //   data?.length > 0 ? data.flatMap(({ visaBookingIds }) => visaBookingIds) : [];
  // // calculating total Invoices
  account &&
    account.map(({ billingDetail }) => {
      total += billingDetail?.total;
      paid += billingDetail?.paid;
      remaining += billingDetail?.remaining;
      // discount += feeItem?.discount;
    });
    ticket &&
    ticket.map(({ billingDetail }) => {
      ticketProfit += billingDetail?.profit;
      ticketCost += billingDetail?.ticketCost;
      ticketDiscount += billingDetail?.discount;
      // discount += feeItem?.discount;
    });

  return (
    <div className='flex justify-between px-20'>
      <Grid>
        <h3>Total Ticket Cost</h3>
        <Box sx={{ minWidth: 150, '& > *': { width: '100%' } }}>
          <CalcWrapper>
            <Typography sx={{ color: 'text.secondary' }}>Ticket Profit: </Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {currencyFormatter(ticketProfit, 'PKR')}
            </Typography>
          </CalcWrapper>
          <CalcWrapper>
            <Typography sx={{ color: 'text.secondary' }}>Ticket Discount: </Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {currencyFormatter(ticketDiscount, 'PKR')}
            </Typography>
          </CalcWrapper>
          <CalcWrapper sx={{ mb: '0 !important' }}>
            <Typography sx={{ color: 'text.secondary' }}>Ticket Cost: </Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {currencyFormatter(ticketCost, 'PKR')}
            </Typography>
          </CalcWrapper>
    
        </Box>
      </Grid>

      <Grid>
        <h3>Total Account Cost</h3>
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
        </Box>
      </Grid>
    </div>
  );
};

export default AddCardItemWithTotal;
