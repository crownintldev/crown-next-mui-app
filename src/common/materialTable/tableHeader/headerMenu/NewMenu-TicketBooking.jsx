import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Icon from 'src/@core/components/icon';
import { IconButton, Menu, MenuItem } from '@mui/material';
import UploadFile from 'src/common/forms/uploadFile/UploadFile';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getReducer } from 'src/store/apps/sliceActionReducer';
//
import { updateManyApi } from 'src/action/function';

const HeaderMenuTicketBooking = ({
  SetForm,
  setSelectedIds,
  setRemoveSelection,
  toggleDrawer,
  selectedIds,
  handleClose,
  removeSelection
}) => {
  const dispatch = useDispatch();
  const setInvoice = getReducer('myInvoice');
  // useSelector
  const ticket = useSelector((state) => state.ticketBooking.data);

  const handleInvoice = () => {
    const invoiceValues = selectedIds.map(
      (id) => ticket?.length > 0 && ticket.find((item) => item._id === id)
    );
    dispatch(setInvoice({ ticket: invoiceValues }));
    router.push('/accounts/invoice/add/');
    handleClose();
  };

  return (
    <>
      <div onClick={handleInvoice}>
        <div>
          <MenuItem
            onClose={handleClose}
            sx={{
              py: 1,
              m: 0
            }}
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
              Create Invoice
            </Box>
          </MenuItem>
        </div>
      </div>
    </>
  );
};

export default HeaderMenuTicketBooking;
