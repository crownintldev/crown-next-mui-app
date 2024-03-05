import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import Icon from 'src/@core/components/icon';
import PassportForm from 'src/common/forms/booking/passport/PassportForm';
import CreateVisaBookingForm from 'src/common/forms/booking/visaBooking/CreateVisaBookingForm';
import PaymentHeadForm from 'src/common/forms/paymentHead/PaymentHeadForm';

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
    const handleSingleDrawerForm = (Form,title) => {
      if (setSelectedIds) {
        setSelectedIds(selectedIds[0]);
      }
      setRemoveSelection({ removeSelection });
      SetForm({ Form,title });
      toggleDrawer();
    };
    return (
      <>
        {selectedIds && selectedIds.length === 1 && (
          <>
            <div onClick={handleClose}>
              <div>
                <MenuItem
                  onClick={() => handleSingleDrawerForm(PassportForm,"Edit Passport")}
                  sx={{ py: 1, m: 0 }}
                >
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
                <MenuItem
                  onClick={() => handleSingleDrawerForm(CreateVisaBookingForm,"Add Visa")}
                  sx={{ py: 1, m: 0 }}
                >
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
                    Duplicate Visa Booking
                  </Box>
                </MenuItem>
              </div>
            </div>
          </>
        )}
        {/* <div onClick={handleClose}>
          <div>
            <MenuItem
              onClick={() => handleSingleDrawerForm(PaymentHeadForm,"Add Payment Head")}
              sx={{ py: 1, m: 0 }}
            >
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
                Add Payment Head
              </Box>
            </MenuItem>
          </div>
        </div> */}
      </>
    );
  };

  return <>{headerMenu()}</>;
};

export default HeaderMenuVisaBooking;
