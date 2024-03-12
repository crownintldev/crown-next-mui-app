// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import { styled, useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import { useSelector } from 'react-redux';
import { currencyFormatter } from 'src/utils/helperfunction';

//
const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  '&:not(:last-child)': {
    paddingRight: `${theme.spacing(2)} !important`
  }
}));

const AddCardInvoiceTo = ({ billingDetail, invoiceTo }) => {
  const theme = useTheme();
  const { fullName,companyName, phone, customer } = invoiceTo;
  const { total, remaining, paid, discount, profit,ticketCost } = billingDetail;
  return (
    <Grid container xl={{ mt: 5 }} xs={{ mt: 5 }} sx={{ mt: 5 }}>
      <Grid item xs={12} sm={12} md={6} sx={{ mb: { lg: 0, xs: 4 } }}>
        <Typography variant='h6' sx={{ mb: 6 }}>
          Invoice To:
        </Typography>

        {invoiceTo && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                  Name: {fullName || companyName}
                </Typography>
              </Grid>
            </Grid>
            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
              Contact: {phone}
            </Typography>
            {customer && (
              <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                Customer: {customer}
              </Typography>
            )}
          </Box>
        )}
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // Use 'space-between' to align content on both sides
          flexDirection: 'column', // Change flexDirection to 'column' for proper alignment
          textAlign: ['left', 'right'], // Align text on both sides
          mb: { xs: 4 }
        }}
      >
        <div>
          <Typography variant='h6' sx={{ mb: 2, textAlign: 'left' }}>
            Billing Detail:
          </Typography>
          <TableContainer>
            <Table>
              <TableBody
                sx={{
                  '& .MuiTableCell-root': { py: `${theme.spacing(0.75)} !important` },
                  display: 'flex',
                  gap: '2rem'
                }}
              >
                {billingDetail && (
                  <>
                    <div>
                      {remaining && (
                        <TableRow>
                          <div>
                            <div className='capitalize text-slate-500 mr-1 text-[0.8rem]'>
                              Total Due:
                            </div>
                          </div>
                          <MUITableCell>
                            <div className='uppercase text-[0.7rem]'>
                              {currencyFormatter(remaining, 'PKR')}
                            </div>
                          </MUITableCell>
                        </TableRow>
                      )}
                      {paid && (
                        <TableRow>
                          <MUITableCell>
                            <div className='capitalize text-slate-500 mr-1 text-[0.8rem]'>
                              Paid:
                            </div>
                          </MUITableCell>
                          <MUITableCell>
                            <div className='uppercase text-[0.7rem]'>
                              {currencyFormatter(paid, 'PKR')}
                            </div>
                          </MUITableCell>
                        </TableRow>
                      )}

                      {ticketCost && (
                        <TableRow>
                          <MUITableCell>
                            <div className='capitalize text-slate-500 mr-1 text-[0.8rem]'>
                              Ticket Cost:
                            </div>
                          </MUITableCell>
                          <MUITableCell>
                            <div className='uppercase text-[0.7rem]'>
                              {currencyFormatter(ticketCost, 'PKR')}
                            </div>
                          </MUITableCell>
                        </TableRow>
                      )}
                      {discount || discount===0  && (
                        <TableRow>
                          <MUITableCell>
                            <div className='capitalize text-slate-500 mr-1 text-[0.8rem]'>
                              Discount:
                            </div>
                          </MUITableCell>
                          <MUITableCell>
                            <div className='uppercase text-[0.7rem]'>
                              {currencyFormatter(discount, 'PKR')}
                            </div>
                          </MUITableCell>
                        </TableRow>
                      )}
                      {profit && (
                        <TableRow>
                          <MUITableCell>
                            <div className='capitalize text-slate-500 mr-1 text-[0.8rem]'>
                              Profit:
                            </div>
                          </MUITableCell>
                          <MUITableCell>
                            <div className='uppercase text-[0.7rem]'>
                              {currencyFormatter(profit, 'PKR')}
                            </div>
                          </MUITableCell>
                        </TableRow>
                      )}
                    </div>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddCardInvoiceTo;
