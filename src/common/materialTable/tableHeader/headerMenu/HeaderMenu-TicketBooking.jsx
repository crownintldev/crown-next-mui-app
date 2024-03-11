import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Icon from 'src/@core/components/icon';
import { IconButton, Menu, MenuItem } from '@mui/material';
import UploadFile from 'src/common/forms/uploadFile/UploadFile';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const invoiceData = useSelector((state) => state.myInvoice.data);
  const setInvoice = getReducer('myInvoice');
  // useSelector
  const ticket = useSelector((state) => state.ticketBooking.data);

  const handleInvoice = () => {
    const invoiceValues = selectedIds.map(
      (id) => ticket?.length > 0 && ticket.find((item) => item._id === id)
    );
    if (invoiceValues && invoiceValues.length > 0) {
      let ticketData = [];

      if (invoiceValues && invoiceValues.length > 0) {
        invoiceValues.map((item) => {
          ticketData.push({
            by: item.by,
            visaTicketBookingIds: [
              {
                invoiceNumber: item.invoiceNumber,
                ticketNumber: item.ticketNumber,
                sector: item.sector,
                paymentMethod: item && item.paymentMethod && item.paymentMethod.name
              }
            ]
          });
        });
      }
      if (invoiceData && invoiceData.length > 0) {
        dispatch(setInvoice([...invoiceData, ...ticketData]));
      } else {
        dispatch(setInvoice(ticketData));
      }
    }

    // const ticketInvoice = invoiceValues.map((item) => ({
    //   invoiceTo: {
    //     name: item?.by?.fullName || item?.by?.companyName,
    //     phone: item?.by?.phone,
    //     customer: item.customer
    //   },
    //   billingDetail: {
    //     profit: item?.profit,
    //     ticketCost: item?.ticketCost,
    //     discount: item?.discount
    //   },
    //   moreDetail: {
    //     ticketNumber: item?.ticketNumber,
    //     invoiceNumber: item?.invoiceNumber,
    //     sector: item?.sector,
    //     paymentMethod: item?.paymentMethod?.name
    //   }
    // }));
    // console.log(ticketInvoice)
    // dispatch(setInvoice({...invoiceData, ticket: ticketInvoice }));
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
