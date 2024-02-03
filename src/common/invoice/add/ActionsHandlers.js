// Next import
import Link from 'next/link'

// React import
import React, { useState, useRef } from 'react'
import QRCode from 'qrcode.react'
import { useReactToPrint } from 'react-to-print'

// Material Imports
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import { TextField } from '@mui/material'

// html2canvas, jspdf
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Normal Imports
import AddCardInvoiceTo from '../invoiceComponents/addCard/AddCardInvoiceTo'
import AddCardItemSelect from '../invoiceComponents/addCard/AddCardItemSelect'
import AddCardItemWithTotal from '../invoiceComponents/addCard/AddCardItemWithTotal'
import AddCardHeader from '../invoiceComponents/addCard/AddCardHeader'
import { useTheme } from '@emotion/react'

const ActionsHandlers = ({ open, onClose, data }) => {
  const itemTotalData = useSelector(state => state.invoice.data)
  const [hasRenderedTotal, setHasRenderedTotal] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const componentPDF = useRef()
  const theme = useTheme()

  // Print generator handler
  const printGenerator = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'Invoice Data'
  })

  const pdfDownloader = () => {
    const modalContent = componentPDF.current
    const actionButtons = modalContent.querySelector('#action-buttons')
    if (actionButtons) {
      actionButtons.style.display = 'none'
    }

    const tempContainer = modalContent.cloneNode(true)
    tempContainer.style.height = 'auto'

    // Append the temporary container to the body
    document.body.appendChild(tempContainer)

    // Capture the screenshot of the temporary container using html2canvas
    html2canvas(tempContainer, { scale: 2, allowTaint: true }).then(canvas => {
      // Convert the canvas to a data URL
      const screenshotUrl = canvas.toDataURL('image/png')

      const pdf = new jsPDF('p', 'mm', 'a4')

      // Add the captured image to the PDF
      pdf.addImage(
        screenshotUrl,
        'PNG',
        0,
        0,
        pdf.internal.pageSize.width,
        pdf.internal.pageSize.height
      )

      // Save the PDF
      pdf.save('invoice_screenshot.pdf')

      document.body.removeChild(tempContainer)
      if (actionButtons) {
        actionButtons.style.display = 'block'
      }
    })
  }

  // Taking screenshot handler
  const screenShotHandler = () => {
    const modalContent = componentPDF.current

    const actionButtons = modalContent.querySelector('#action-buttons')
    if (actionButtons) {
      actionButtons.style.display = 'none'
    }

    const tempContainer = modalContent.cloneNode(true)
    tempContainer.style.height = 'auto'
    document.body.appendChild(tempContainer)

    // Capture the screenshot of the temporary container using html2canvas
    html2canvas(tempContainer).then(canvas => {
      // Convert the canvas to a data URL
      const screenshotUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = screenshotUrl
      link.download = 'invoice screenshot.png'
      link.click()

      document.body.removeChild(tempContainer)

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

  const options = [
    { label: 'Account', link: '/accounts/account/' },
    { label: 'Booking', link: '/accounts/account/' },
    { label: 'Flight', link: '/accounts/account/' }
  ]

  const handleOptionSelect = (event, option) => {
    setSelectedOption(option)
  }

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
            <Box
              sx={{
                textAlign: 'center',
                p: theme.spacing(4),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginBottom: 4
              }}
            >
              <Typography variant='h2' sx={{ mb: 1.5 }}>
                No Invoices Created, Invoices create first...
              </Typography>
              <Stack sx={{ width: 250 }}>
                <div>
                  <Autocomplete
                    id='custom-autocomplete'
                    options={options}
                    getOptionLabel={option => option.label}
                    onChange={handleOptionSelect}
                    renderInput={params => <TextField {...params} label='Select your creation' />}
                    renderOption={(props, option) => (
                      <Link href={option.link}>
                        <li {...props}>
                          <span>{option.label}</span>
                        </li>
                      </Link>
                    )}
                  />
                </div>
              </Stack>
            </Box>
          )}
          <Box
            id='action-buttons'
            sx={{
              textAlign: 'center',
              mt: '10'
            }}
          >
            <Button variant='contained' onClick={printGenerator} sx={{ marginRight: 2 }}>
              Print
            </Button>

            {/* <Button variant='contained' onClick={pdfDownloader} sx={{ marginRight: 2 }}>
              Download PDF
            </Button>
            <Button variant='contained' onClick={screenShotHandler} sx={{ marginRight: 2 }}>
              Screenshot
            </Button> */}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ActionsHandlers
