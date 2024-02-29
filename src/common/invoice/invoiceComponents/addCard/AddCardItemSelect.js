import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import visaBooking from 'src/store/apps/booking/visaBooking'

const AddCardItemSelect = ({ visaBookingIds }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='invoice table'>
        <TableHead>
          <TableRow>
            <TableCell align='right'>Passport no#</TableCell>
            <TableCell align='right'>Given name</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Visa category</TableCell>
            {
              visaBookingIds.map((invoice, index)=>{
                (invoice.visaId.confirmed || invoice.visaId.confirmed ) && <TableCell align='right'>Visa confirm/process</TableCell>
              })
            }
            
            <TableCell align='right'>Visa destination</TableCell>
            <TableCell align='right'>Visa duration</TableCell>
            <TableCell align='right'>Visa type</TableCell>
            {/* Add more headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {visaBookingIds ? (
            visaBookingIds.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell align='right'>{invoice.passport.passportNumber}</TableCell>
                <TableCell align='right'>{invoice.passport.givenName}</TableCell>
                <TableCell align='right'>{invoice.status}</TableCell>
                <TableCell align='right'>{invoice.visaId.category}</TableCell>
               
                {invoice.visaId.confirmed && (
                  <TableCell align='right'>{invoice.visaId.confirmed.totalFee}</TableCell>
                )}
           
                {invoice.visaId.processing && ( 
                  <>
                    <TableCell align='right'>
                      {invoice.visaId.processing.processingFee}
                    </TableCell>
                    <TableCell align='right'>
                      {invoice.visaId.processing.visaFee}
                    </TableCell>
                  </>
                )}
                {/* <TableCell align='right'>{invoice.visaId.category}</TableCell> */}
                <TableCell align='right'>{invoice.visaId.destination}</TableCell>
                <TableCell align='right'>{invoice.visaId.duration}</TableCell>
                <TableCell align='right'>{invoice.visaId.type}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align='center'>No Invoice Data Created ...</TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AddCardItemSelect
