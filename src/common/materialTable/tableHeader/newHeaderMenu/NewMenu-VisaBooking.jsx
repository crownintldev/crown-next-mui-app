import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Icon from 'src/@core/components/icon';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PassportUploadFile from 'src/common/forms/uploadFile/PassportUploadFile';
//redux
import { useDispatch } from 'react-redux';
import { fetchVisaBooking } from 'src/store';
//
import { updateManyApi } from 'src/action/function';
const statusList = [
  'pending',
  'editing',
  'booked',
  'inprocess',
  'verification',
  'in Embassy',
  'approved',
  'returned',
  'cancelled',
  'delivered',
  'rejected',
  'trash'
];

const NewHeaderMenuVisaBooking = ({
  SetForm,
  toggleDrawer,
  selectedIds,
  toggle,
  removeSelection
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleStatus = (status) => {
    let data = { status, visaBookingIds: selectedIds };
    updateManyApi({
      data,
      dispatch,
      fetchData: fetchVisaBooking,
      completeApi: 'visa-booking/update'
    });
  };
  const handleSingleDrawerForm = (Form,title) => {
    SetForm({ Form,title });
    toggleDrawer();
  };
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
            icon='mdi:list-status'
            // color='#2b60fe'
          />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {selectedIds && selectedIds.length > 0 && (
            <div onClick={handleClose}>
              <div>
                {statusList.map((item) => {
                  return (
                    <MenuItem
                      onClick={() => handleStatus(item)}
                      sx={{
                        py: 0.2,
                        m: 0
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '1em',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Icon fontSize='0.8rem' />
                        {item}
                      </Box>
                    </MenuItem>
                  );
                })}
              </div>
            </div>
          )}
        </Menu>
      </Box>
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
            icon='material-symbols:upload'
            onClick={()=>handleSingleDrawerForm(PassportUploadFile,"Export Csv Upload Passport")}
          />
        </IconButton>
      </Box>
    </>
  );
};

export default NewHeaderMenuVisaBooking;
