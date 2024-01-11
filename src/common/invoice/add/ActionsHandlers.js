// React import
import React from 'react'

// Material Imports
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'

// Normal Imports
import AddCardInvoiceTo from '../invoiceComponents/addCard/AddCardInvoiceTo'
import AddCardItemSelect from '../invoiceComponents/addCard/AddCardItemSelect'
import AddCardItemWithTotal from '../invoiceComponents/addCard/AddCardItemWithTotal'
import AddCardHeader from '../invoiceComponents/addCard/AddCardHeader'
import { Divider } from '@mui/material'

const ActionsHandlers = ({ open, onClose, data }) => {
  let total = 0,
    paid = 0,
    remaining = 0,
    discount = 0

  data.map(feeItem => {
    total += feeItem.amount.total
    paid += feeItem.amount.paid
    remaining += feeItem.amount.remaining
    discount += feeItem.amount.discount
    console.log('require output', total, paid, remaining, discount)
  })

  const itemTotalData = useSelector(state => state.invoice.data)

  console.log('action data', data)
  // Function to handle the print button click
  const handlePrint = () => {
    // Implement your print logic here
    console.log('Print button clicked')
  }

  // Function to handle the PDF button click
  const handlePDF = () => {
    // Implement your PDF generation logic here
    console.log('PDF button clicked')
  }

  // Function to handle the screenshot button click
  const handleScreenshot = () => {
    // Implement your screenshot logic here
    console.log('Screenshot button clicked')
  }

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
          width: '60%',
          height: '70%',
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
        <AddCardHeader />
        <Divider />
        {data.map((invoiceData, index) => (
          <React.Fragment key={index}>
            <AddCardInvoiceTo clientData={invoiceData.by} amount={invoiceData.amount} />
            <AddCardItemSelect visaBookingIds={invoiceData.visaBookingIds} />
            <AddCardItemWithTotal data={itemTotalData} />
            <Divider />
          </React.Fragment>
        ))}
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button variant='outlined' onClick={handlePrint} sx={{ marginRight: 2 }}>
            Print
          </Button>
          <Button variant='outlined' onClick={handlePDF} sx={{ marginRight: 2 }}>
            PDF
          </Button>
          <Button variant='outlined' onClick={handleScreenshot}>
            Screenshot
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ActionsHandlers
