// NEXT Imports
import Link from 'next/link';

// ** React Imports
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReducer } from 'src/store/apps/sliceActionReducer';

// ** MUI Imports
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';

// ** Custom Component Imports
import CustomTextField from 'src/@core/components/mui/text-field';

//AddCardComponent
import AddCardHeader from '../invoiceComponents/addCard/AddCardHeader';
import AddCardInvoiceTo from '../invoiceComponents/addCard/AddCardInvoiceTo';
import AddCardItemSelect from '../invoiceComponents/addCard/AddCardItemSelect';
import AddCardItemWithTotal from '../invoiceComponents/addCard/AddCardItemWithTotal';
import AddTicketCardItemSelect from '../invoiceComponents/addCard/AddTicketCardItemSelect';

import { useSelector } from 'react-redux';

const AddCard = (props) => {
  // ** Props
  const {
    clients,
    invoiceNumber,
    selectedClient,
    setSelectedClient,
    toggleAddCustomerDrawer,
    cardHeader,
    invoiceData
  } = props;

  // ** States
  //AddCardInvoiceTo states
  const [userCategory, setUserCategory] = useState(null);
  const [selectUser, setSelectUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  // console.log(invoiceDataArray);
  //**end AddCardInvoiceTo states
  const dispatch = useDispatch();
  const setInvoice = getReducer('myInvoice');
  const accountInvoice = invoiceData.account;

  // ** Hook
  const theme = useTheme();

  // ** Deletes form

  const options = [
    { label: 'Account', link: '/accounts/account/visa-account' },
    { label: 'Ticket', link: '/accounts/booking/ticket' }
    // { label: 'Booking', link: '/accounts/account/' },
    // { label: 'Flight', link: '/accounts/account/' }
  ];

  const handleOptionSelect = (event, option) => {
    setSelectedOption(option);
  };
  // clear invoice
  const handleClearInvoice = () => {
    dispatch(setInvoice());
  };
  console.log(invoiceData);
  return (
    <Card>
      {/* Header ---------------------------------------------------------------*/}
      <CardContent
        sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}
      >
        <div className='flex justify-end pb-2'>
          <Button onClick={handleClearInvoice}>Clear Invoice</Button>
        </div>
        <AddCardHeader invoiceNumber={invoiceNumber} cardHeader={cardHeader} />
      </CardContent>

      <Divider />

      <CardContent
        sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}
      >
        {/* {!invoiceData || !accountInvoice ? (
          // Error message
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
            <Stack spacing={1} sx={{ width: 250 }}>
              <div>
                <Autocomplete
                  id='custom-autocomplete'
                  options={options}
                  getOptionLabel={(option) => option.label}
                  onChange={handleOptionSelect}
                  renderInput={(params) => (
                    <TextField {...params} label='Select your creation' />
                  )}
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
        ) : // for account app */}
        {invoiceData.account && invoiceData.account.length > 0 && (
          <div>
            <h2 className='flex justify-center mb-10'>Account Invoice</h2>
            {invoiceData.account?.map((item, index) => {
              const { billingDetail, invoiceTo, visaBooking } = item;
              {
                /* console.log(visaBooking) */
              }
              return (
                <>
                  <AddCardInvoiceTo billingDetail={billingDetail} invoiceTo={invoiceTo} />
                  <Divider />
                  <AddCardItemSelect body={visaBooking} />
                </>
              );
            })}
          </div>
        )}
        {invoiceData.ticket && invoiceData.ticket.length > 0 && (
          <div>
            <h2 className='flex justify-center mb-10'>Ticket Invoice</h2>
            {invoiceData.ticket?.map((item) => {
              const { billingDetail, invoiceTo, moreDetail } = item;
              return (
                <>
                  <AddCardInvoiceTo billingDetail={billingDetail} invoiceTo={invoiceTo} />
                  <Divider />
                  <AddTicketCardItemSelect body={moreDetail} />
                </>
              );
            })}
          </div>
        )}
      </CardContent>
      <div className='flex justify-center items-center flex-col'>
        <h3>Select App</h3>
        <Stack spacing={1} sx={{ width: 250 }}>
          <div>
            <Autocomplete
              id='custom-autocomplete'
              options={options}
              getOptionLabel={(option) => option.label}
              onChange={handleOptionSelect}
              renderInput={(params) => (
                <TextField {...params} label='Select your creation' />
              )}
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
      </div>
      <Divider />
      {/* ItemWithTotal ------------------------------------------------------- */}
      <CardContent
        sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}
      >
        <AddCardItemWithTotal invoiceData={invoiceData} />
      </CardContent>

      <Divider />
      {/* Note ------------------------------------------------------- */}
      <CardContent sx={{ px: [6, 10] }}>
        <InputLabel
          htmlFor='invoice-note'
          sx={{
            mb: 2,
            fontWeight: 500,
            fontSize: theme.typography.body2.fontSize,
            lineHeight: 'normal'
          }}
        >
          Note:
        </InputLabel>
        <CustomTextField
          rows={2}
          fullWidth
          multiline
          id='invoice-note'
          defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
        />
      </CardContent>
    </Card>
  );
};

export default AddCard;
