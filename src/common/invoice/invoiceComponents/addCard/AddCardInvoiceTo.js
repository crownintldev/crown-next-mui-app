// ** MUI Imports
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TableContainer from '@mui/material/TableContainer'
import { styled, useTheme } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { useSelector } from 'react-redux'
import { currencyFormatter } from 'src/utils/helperfunction'

//
const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  '&:not(:last-child)': {
    paddingRight: `${theme.spacing(2)} !important`
  }
}))

const AddCardInvoiceTo = ({ clientData, amount }) => {
  const theme = useTheme()
  // console.log('amount', amount)

  return (
    <Grid container xl={{ mt: 5 }} xs={{ mt: 5 }} sx={{ mt: 5 }}>
      <Grid item xs={12} sm={12} md={6} sx={{ mb: { lg: 0, xs: 4 } }}>
        <Typography variant='h6' sx={{ mb: 6 }}>
          Invoice To:
        </Typography>

        {clientData && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                  Name: {clientData.fullName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                  Passport Number: {clientData.passportNumber}
                </Typography>
              </Grid>
            </Grid>
            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
              Contact: {clientData.phone}
            </Typography>
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
                {amount && (
                  <>
                    <div>
                      <TableRow>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>Total Due:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                             {currencyFormatter(amount.total,"PKR")} 
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>Paid:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {currencyFormatter(amount.paid,"PKR")} 
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                    </div>
                    <div>
                      <TableRow>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>Remaining:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {currencyFormatter(amount.remaining,"PKR")} 
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>Discount:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {currencyFormatter(amount.discount ?? 0,"PKR")} 
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                    </div>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  )
}

export default AddCardInvoiceTo
