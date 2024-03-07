import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import visaBooking from 'src/store/apps/booking/visaBooking'

const AddCardItemSelect = ({ body }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='invoice table'>
        <TableHead>
          <TableRow className='space-x-2'>
         
            
            <TableCell align='right'>Passport Number</TableCell>
            <TableCell align='right'>Given Name</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>total</TableCell>
          
            
            <TableCell align='right'>category</TableCell>
            <TableCell align='right'>duration</TableCell>
            <TableCell align='right'>destination</TableCell>
            {/* <TableCell align='right'>type</TableCell> */}
            {/* Add more headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {body && (
            body.map((item, index) => (
              <TableRow key={index}>
                <TableCell align='right'>{item.passportNumber}</TableCell>
                <TableCell align='right'>{item.givenName}</TableCell>
                <TableCell align='right'>{item.status}</TableCell>
                <TableCell align='right'>{item.total}</TableCell>
                <TableCell align='right'>{item.category}</TableCell>
                <TableCell align='right'>{item.duration}</TableCell>
                <TableCell align='right'>{item.destination}</TableCell>
                {/* <TableCell align='right'>{item.type}</TableCell> */}
               
             
              </TableRow>
            ))
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AddCardItemSelect
