import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import Icon from 'src/@core/components/icon';
import PaymentHeadForm from 'src/common/forms/subsidiary/subsidiaryForm';
import { getReducer } from 'src/store/apps/sliceActionReducer';
import { useRouter } from 'next/router';
import EditAccountForm from 'src/common/forms/account/EditAccountForm';

const HeaderMenuAccount = ({
  SetForm,
  setSelectedIds,
  setRemoveSelection,
  toggleDrawer,
  selectedIds,
  handleClose,
  removeSelection,
  selectedChildIds,
  accountId
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const setInvoice = getReducer('myInvoice');
  const accountData = useSelector((state) => state.account.data);
  const invoiceData = useSelector((state) => state.myInvoice.data);

  const handleInvoice = () => {
    const invoiceValues = selectedIds.map(
      (id) => accountData?.length > 0 && accountData.find((item) => item._id === id)
    );
    if (invoiceValues && invoiceValues.length > 0) {
      if (invoiceData && invoiceData.length > 0) {
        dispatch(setInvoice([...invoiceData, ...invoiceValues]));
      } else {
        dispatch(setInvoice(invoiceValues));
      }
    }
    // const accountInvoiceData = invoiceValues?.map((item) => ({
    //   invoiceTo: {
    //     name: item?.by?.fullName || item?.by?.companyName,
    //     phone: item?.by?.phone
    //   },
    //   billingDetail: {
    //     total: item?.subTotal,
    //     remaining: item?.remaining,
    //     paid: item?.paid
    //   },
    //   visaBooking: item.visaBookingIds?.map((booking) => ({
    //     passportNumber: booking.passport.passportNumber,
    //     givenName: booking.passport.givenName,
    //     status: booking.status,
    //     total: booking.total,
    //     destination: booking?.visaId?.destination?.name,
    //     duration: booking?.visaId?.duration?.name,
    //     category: booking?.visaId?.category?.name,
    //     type: booking?.visaId?.type?.name
    //   }))
    // }));
    // console.log(accountInvoiceData);
    // dispatch(setInvoice({...invoiceData, account: accountInvoiceData }));
    // if(invoiceData != null){
    //   dispatch(setInvoice([...invoiceData, ...invoiceValues]));
    // }
    // else{
    //   dispatch(setInvoice({account:accountInvoiceData}));
    // }

    // console.log('kdkd', invoiceData, invoiceValues)
    // dispatch(setInvoice(invoiceValues));
    router.push('/accounts/invoice/add/');
    handleClose();
  };

  const handleSingleDrawerForm = (Form,title) => {
    if (selectedChildIds) {
      setSelectedIds(selectedChildIds);
    }
    setRemoveSelection({ removeSelection });
    SetForm({ Form,title });
    toggleDrawer();
  };
  const headerMenu = () => {
    return (
      <>
        {selectedIds?.length > 0 && (
          <div onClick={handleInvoice}>
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
        )}
        {selectedChildIds?.length > 0 && (
          <div onClick={handleClose}>
            <MenuItem
               onClick={() => handleSingleDrawerForm(EditAccountForm,"Pay")}
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
               Pay
              </Box>
            </MenuItem>
          </div>
        )}
      </>
    );
  };

  return <>{headerMenu()}</>;
};

export default HeaderMenuAccount;
