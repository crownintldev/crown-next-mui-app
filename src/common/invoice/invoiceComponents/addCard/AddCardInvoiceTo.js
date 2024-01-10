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
  console.log('amount', amount)

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} sx={{ mb: { lg: 0, xs: 4 } }}>
        <Typography variant='h6' sx={{ mb: 6 }}>
          Invoice To:
        </Typography>

        {clientData && (
          <Box>
            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
              Name: {clientData.fullName}
            </Typography>
            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
              Passport Number: {clientData.passportNumber}
            </Typography>
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
        sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}
      >
        <div>
          <Typography variant='h6' sx={{ mb: 6 }}>
            Billing Detail:
          </Typography>
          <TableContainer>
            <Table>
              <TableBody
                sx={{ '& .MuiTableCell-root': { py: `${theme.spacing(0.75)} !important` } }}
              >
                {amount && (
                  <>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Total Due:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          Rs: {amount.total}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Paid:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          Rs: {amount.paid}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Remaining:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          Rs: {amount.remaining}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Discount:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          Rs: {amount.discount}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
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
