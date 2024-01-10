import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const AddCardItemSelect = ({ visaBookingIds }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='invoice table'>
        <TableHead>
          <TableRow>
            <TableCell align='right'>Passport Number</TableCell>
            <TableCell align='right'>Given Name</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Visa Category</TableCell>
            <TableCell align='right'>Visa Confirmation / Processing</TableCell>
            <TableCell align='right'>Visa Destination</TableCell>
            <TableCell align='right'>Visa Duration</TableCell>
            <TableCell align='right'>Visa Type</TableCell>
            {/* Add more headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {visaBookingIds ? (
            visaBookingIds.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell align='right'>{invoice.passportId.passportNumber}</TableCell>
                <TableCell align='right'>{invoice.passportId.givenName}</TableCell>
                <TableCell align='right'>{invoice.status}</TableCell>
                <TableCell align='right'>{invoice.visaId.category}</TableCell>
                {invoice.visaId.confirmed && (
                  <TableCell align='right'>{invoice.visaId.confirmed.totalFee}</TableCell>
                )}
                {invoice.visaId.processing && (
                  <>
                    <TableCell align='right'>{invoice.visaId.processing.processingFee}</TableCell>
                    <TableCell align='right'>{invoice.visaId.processing.visaFee}</TableCell>
                  </>
                )}
                <TableCell align='right'>{invoice.visaId.category}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align='center'>No Invoice Data Created ...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AddCardItemSelect
