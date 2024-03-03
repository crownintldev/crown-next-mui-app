import { Box } from '@mui/system'
import React from 'react'
import toast from 'react-hot-toast';
import { IconButton, Menu, MenuItem } from '@mui/material';

// import { mdiCallToAction } from '@mdi/js';
import Button from '@mui/material/Button';

import Icon from 'src/@core/components/icon';



const MoreHeaderButtonMenuVisaBooking = () => {
  const handleClick=()=>{}
  return (
    <>
    <Box
        sx={{
          rowGap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <IconButton onClick={handleClick}>
          <Icon
            fontSize='1.5rem'
            icon='mdi:call-to-action'
            // color='#2b60fe'
          />
        </IconButton>
      </Box>
      </>
  )
}

export default MoreHeaderButtonMenuVisaBooking