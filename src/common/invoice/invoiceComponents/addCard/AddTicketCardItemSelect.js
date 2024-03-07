import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AddTicketCardItemSelect = ({ body }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='invoice table'>
        <TableHead>
          <TableRow className='space-x-2'>
            <TableCell align='right'>Inoice Number</TableCell>
            <TableCell align='right'>Payment Method</TableCell>
            <TableCell align='right'>Sector</TableCell>
            <TableCell align='right'>Ticket Number</TableCell>

            {/* Add more headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {body && 
              <TableRow >
                <TableCell align='right'>{body.invoiceNumber}</TableCell>
                <TableCell align='right'>{body.paymentMethod}</TableCell>
                <TableCell align='right'>{body.sector}</TableCell>
                <TableCell align='right'>{body.ticketNumber}</TableCell>
              </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AddTicketCardItemSelect;
