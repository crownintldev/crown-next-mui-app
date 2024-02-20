import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import Icon from 'src/@core/components/icon';
import PassportForm from 'src/common/forms/booking/passport/PassportForm';
import EditVisaBookingForm from 'src/common/forms/booking/visaBooking/EditVisaBookingForm';
import CreateVisaBookingForm from 'src/common/forms/booking/visaBooking/CreateVisaBookingForm';

const HeaderMenuVisaBooking = ({
  SetForm,
  setSelectedIds,
  setRemoveSelection,
  toggleDrawer,
  selectedIds,
  handleClose,
  removeSelection
}) => {
  const headerMenu = () => {
    const handleEditPassport = () => {
      setSelectedIds(selectedIds[0]);
      setRemoveSelection({ removeSelection });
      SetForm({ Form: PassportForm });
      toggleDrawer();
    };
    const handleCreateVisa = () => {
      setSelectedIds(selectedIds[0]);
      setRemoveSelection({ removeSelection });
      SetForm({ Form: CreateVisaBookingForm });
      toggleDrawer();
    };
    return (
      <>
        {selectedIds && selectedIds.length === 1 && (
          <>
            <div onClick={handleClose}>
              <div>
                <MenuItem onClick={handleEditPassport} sx={{ py: 1, m: 0 }}>
                  <Box
                    sx={{
                      fontSize: '0.8em',
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '4px',
                      color: '#2b60fe'
                    }}
                  >
                    <Icon fontSize='0.8rem' icon='tabler:plus' />
                    Edit Passport Booking
                  </Box>
                </MenuItem>
              </div>
            </div>
            <div onClick={handleClose}>
              <div>
                <MenuItem onClick={handleCreateVisa} sx={{ py: 1, m: 0 }}>
                  <Box
                    sx={{
                      fontSize: '0.8em',
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '4px',
                      color: '#2b60fe'
                    }}
                  >
                    <Icon fontSize='0.8rem' icon='tabler:plus' />
                    Add New Visa
                  </Box>
                </MenuItem>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return <>{headerMenu()}</>;
};

export default HeaderMenuVisaBooking;
