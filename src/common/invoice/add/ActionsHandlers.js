// Next import
import Link from 'next/link'
// React import
import React, { useRef } from 'react'

// Material Imports
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'

// Normal Imports
import AddCardInvoiceTo from '../invoiceComponents/addCard/AddCardInvoiceTo'
import AddCardItemSelect from '../invoiceComponents/addCard/AddCardItemSelect'
import AddCardItemWithTotal from '../invoiceComponents/addCard/AddCardItemWithTotal'
import AddCardHeader from '../invoiceComponents/addCard/AddCardHeader'
import { Divider } from '@mui/material'

const ActionsHandlers = ({ open, onClose, data }) => {
  const itemTotalData = useSelector(state => state.invoice.data)
  const printRef = useRef()

  console.log('action data', data)

  // print handler
  const handlePrint = () => {
    const printContent = document.getElementById('print-content') // Create an element to hold the content to be printed
    const originalDisplay = printContent.style.display // Store the original display style

    // Set display to 'block' to make the content visible for printing
    printContent.style.display = 'block'

    // Trigger the print dialog
    window.print()

    // Restore the original display style
    printContent.style.display = originalDisplay
  }
  // PDF generator handler
  const handlePDF = () => {
    console.log('PDF button clicked')
  }

  // taking screenshot handler
  const handleScreenshot = () => {
    console.log('Screenshot button clicked')
  }

  const multiRender = data.map((invoiceData, index) => (
    <React.Fragment key={index}>
      {/* {index === 0 && <AddCardHeader />} */}
      <AddCardInvoiceTo clientData={invoiceData.by} amount={invoiceData.amount} />
      <AddCardItemSelect visaBookingIds={invoiceData.visaBookingIds} />
      <AddCardItemWithTotal data={itemTotalData} />
      {index < data.length - 1 && <hr />} {/* Add a horizontal line separator */}
    </React.Fragment>
  ))

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          p: 20,
          overflow: 'auto',
          color: 'black'
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 0, right: 0, color: 'black' }}
        >
          <CloseIcon />
        </IconButton>
        {data ? (
          multiRender
        ) : (
          // Error message
          <Box sx={{ textAlign: 'center', mt: 10, mb: 10 }}>
            <Typography variant='h2' sx={{ mb: 1.5 }}>
              No Invoices Created, Invoices create first...
            </Typography>
            <Button href='/accounts/account' component={Link} variant='outlined'>
              Create Invoice First...
            </Button>
          </Box>
        )}
        <Box
          id='print-content' // This element will be shown and hidden for printing
          sx={{
            textAlign: 'center',
            mt: '10'
          }}
        >
          <Button variant='contained' onClick={handlePrint} sx={{ marginRight: 2 }}>
            Print
          </Button>
          <Button variant='contained' onClick={handlePDF} sx={{ marginRight: 2 }}>
            PDF
          </Button>
          <Button variant='contained' onClick={handleScreenshot} sx={{ marginRight: 2 }}>
            Screenshot
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ActionsHandlers
