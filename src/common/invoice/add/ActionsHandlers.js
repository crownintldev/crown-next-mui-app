// Next import
import Link from 'next/link'

// React import
import React, { useState, useRef } from 'react'
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

const ActionsHandlers = ({ open, onClose, data }) => {
  const itemTotalData = useSelector(state => state.invoice.data)
  const [hasRenderedTotal, setHasRenderedTotal] = useState(false)

  const componentPDF = useRef()

  // PDF generator handler
  const pdfGenerator = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'Invoice Data'
  })

  // Taking screenshot handler
  // Taking screenshot handler
  const screenShotHandler = () => {
    const modalContent = componentPDF.current

    // Hide the buttons during the screenshot capture
    const actionButtons = modalContent.querySelector('#action-buttons')
    if (actionButtons) {
      actionButtons.style.display = 'none'
    }

    // Clone the modal content to create a temporary container
    const tempContainer = modalContent.cloneNode(true)

    // Set the height to auto to capture the entire content
    tempContainer.style.height = 'auto'

    // Append the temporary container to the body
    document.body.appendChild(tempContainer)

    // Capture the screenshot of the temporary container using html2canvas
    html2canvas(tempContainer).then(canvas => {
      // Convert the canvas to a data URL
      const screenshotUrl = canvas.toDataURL('image/png')

      // Create a temporary link element to trigger the download
      const link = document.createElement('a')
      link.href = screenshotUrl
      link.download = 'screenshot.png'

      // Trigger a click event on the link to initiate the download
      link.click()

      // Remove the temporary container from the body
      document.body.removeChild(tempContainer)

      // Show the buttons after capturing the screenshot
      if (actionButtons) {
        actionButtons.style.display = 'block'
      }
    })
  }

  const multiRender = data.map((invoiceData, index) => (
    <React.Fragment key={index}>
      {index === 0 && <AddCardHeader />}
      <AddCardInvoiceTo clientData={invoiceData.by} amount={invoiceData.amount} />
      <AddCardItemSelect visaBookingIds={invoiceData.visaBookingIds} />
      {index < data.length - 1 && <hr />}
      {index + 1 === data.length && !hasRenderedTotal && (
        <>
          <AddCardItemWithTotal data={itemTotalData} />
          {setHasRenderedTotal(true)}{' '}
        </>
      )}
    </React.Fragment>
  ))

  return (
    <div style={{ position: 'relative !important', height: '100% !important' }}>
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
            color: 'black',
            '@media print': {
              // Hide elements during printing
              '& #close-button, & #action-buttons': {
                display: 'none'
              }
            }
            // height: '60vh',
            // width: '60vw'
          }}
        >
          <IconButton
            id='close-button'
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
            <>
              {multiRender}
              <AddCardItemWithTotal data={itemTotalData} />
            </>
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
            id='action-buttons'
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
            <Button variant='contained' onClick={screenShotHandler} sx={{ marginRight: 2 }}>
              Screenshot
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ActionsHandlers
