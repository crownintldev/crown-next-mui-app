// Next import
import Link from 'next/link'

// React import
import React, { useRef } from 'react'
import QRCode from 'qrcode.react' // Import the QR code library
import { useReactToPrint } from 'react-to-print'

// Material Imports
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'

// html2canvas
import html2canvas from 'html2canvas'

// Normal Imports
import AddCardInvoiceTo from '../invoiceComponents/addCard/AddCardInvoiceTo'
import AddCardItemSelect from '../invoiceComponents/addCard/AddCardItemSelect'
import AddCardItemWithTotal from '../invoiceComponents/addCard/AddCardItemWithTotal'
import AddCardHeader from '../invoiceComponents/addCard/AddCardHeader'
import { Divider } from '@mui/material'

// new

const ActionsHandlers = ({ open, onClose, data }) => {
  const itemTotalData = useSelector(state => state.invoice.data)
  const componentPDF = useRef()

  // Print handler
  // const pdfGenerator = () => {
  //   const printContent = modalRef.current
  //   const originalDisplay = printContent.style.display
  //   printContent.style.display = 'block'
  //   window.print()
  //   printContent.style.display = originalDisplay
  // }

  // PDF generator handler
  const pdfGenerator = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'Invoice Data',
    onAfterPrint: () => alert('Data saved in pdf.')
  })

  // Taking screenshot handler
  const handleScreenshot = () => {
    const printContent = modalRef.current

    // Capture the screenshot of the modal using html2canvas
    import('html2canvas').then(html2canvas => {
      html2canvas.default(printContent).then(canvas => {
        // Convert the canvas to a data URL
        const screenshotUrl = canvas.toDataURL('image/png')

        // Create a temporary link element to trigger the download
        const link = document.createElement('a')
        link.href = screenshotUrl
        link.download = 'screenshot.png'

        // Trigger a click event on the link to initiate the download
        link.click()
      })
    })
  }

  const multiRender = data.map((invoiceData, index) => (
    <React.Fragment key={index}>
      {index === 0 && <AddCardHeader />}
      <AddCardInvoiceTo clientData={invoiceData.by} amount={invoiceData.amount} />
      <AddCardItemSelect visaBookingIds={invoiceData.visaBookingIds} />
      <AddCardItemWithTotal data={itemTotalData} />
      {index < data.length - 1 && <hr />}
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
        id='modal-content'
        ref={componentPDF}
        sx={{
          position: 'absolute',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          p: 20,
          overflowY: 'auto',
          maxHeight: '80vh',
          width: '80vw',
          color: 'black'
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 0, right: 0, color: 'black' }}
        >
          <CloseIcon />
        </IconButton>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <QRCode
            value='https://crown-travokey.com/generate-pdf?params=your-parameters'
            size={128}
            bgColor='#ffffff'
            fgColor='#000000'
            level='L'
          />
        </div>
        {data && data.length > 0 ? (
          multiRender
        ) : (
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
          sx={{
            textAlign: 'center',
            mt: '10'
          }}
        >
          <Button variant='contained' onClick={pdfGenerator} sx={{ marginRight: 2 }}>
            Print
          </Button>
          <Button variant='contained' onClick={pdfGenerator} sx={{ marginRight: 2 }}>
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
