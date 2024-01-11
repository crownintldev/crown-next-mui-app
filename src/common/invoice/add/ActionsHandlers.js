// ActionsHandlers.js

import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const ActionsHandlers = ({ open, onClose, data }) => {
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
        backgroundColor: 'rgba(255, 255, 255, 1)' // Set white background color
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '80%', // Adjust the width as needed
          height: '80%', // Adjust the height as needed
          backgroundColor: 'white', // Set white background color
          borderRadius: '8px', // Optional: Add border-radius for rounded corners
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add blur or shadow effect
          p: 4,
          overflow: 'auto',
          color: 'black' // Set text color to black
        }}
      >
        {/* Your modal content goes here */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 0, right: 0, color: 'black' }}
        >
          <CloseIcon />
        </IconButton>
        {/* Display your data */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
        {/* Buttons for Print, PDF, and Screenshot */}
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
