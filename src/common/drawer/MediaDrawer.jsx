import React from 'react'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const MediaDrawer = ({ open, onClose, data }) => {
  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box p={2} width={300}>
        <Typography variant='h5' gutterBottom>
          Media Drawer Content
        </Typography>
        <Typography variant='body1'>Here is some static data:</Typography>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <Button variant='contained' color='primary' onClick={onClose}>
          Close
        </Button>
      </Box>
    </Drawer>
  )
}

export default MediaDrawer
