import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import axiosInstance from 'src/utils/axiosInstance';
// ** MUI Imports
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import Box from '@mui/material/Box';

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field';

import { useDispatch, useSelector } from 'react-redux';

// ** Actions Imports
import { fetchData } from 'src/store/apps/account';
import { fetchPaymentMethod } from 'src/store';
//helper function
import { axiosErrorMessage, isAllSameinArray } from 'src/utils/helperfunction';

//get by data
import axios from 'axios';

// ** Third Party Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Typography } from '@mui/material';
import { updateApi, updateManyApi } from 'src/action/function';
import IdNameForm from '../idnameForm/IdNameForm';
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField';
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer';
import SelectHookField from 'src/common/dataEntry/SelectHookField';
import DatePickerHookField from 'src/common/dataEntry/DatePickerHookField';

//custom vuexy select style
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const schema = yup.object().shape({
  // visaBookingIds: yup.array().of(yup.string()).required('Visa booking IDs are required.'),
  // visaId: yup.string().required('Visa ID is required.'),
  // status: yup.string().required('Status is required.')
});

const defaultValues = {
  paymentMethod: '',
  paymentDescription: '',
  date: ''
};

// ------------------visaBooking Form-----------------------
const AccountPayForm = ({ toggle, _id: nested, removeSelection, setFormSize }) => {
  useEffect(() => {
    setFormSize(800);
  }, []);
  // ** State
  const dispatch = useDispatch();
  const [toPay, setToPay] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [updatedBookings, setUpdatedBookings] = useState([]);

  const { accountId, selectedChildIds } = nested;
  const accountItem = useSelector((state) =>
    state.account.data.find((item) => item._id === accountId)
  );
 
  const visaBookings = accountItem.visaBookingIds.filter((item) =>
    selectedChildIds.includes(item._id)
  );
  let bookingTotal = visaBookings.reduce(
    (accum, item) => accum + Number(item.total ?? 0) - Number(item.paid ?? 0),
    0
  );
  // console.log(visaBookings)
  const {
    reset,
    control,
    setError,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const paymentMethod = useSelector((state) => state?.paymentMethod?.data);
  const testValidityRefer = true;
  // isAllSameinArray(accountItems, 'ReferName');

  useEffect(() => {
    dispatch(fetchPaymentMethod({}));
  }, [dispatch]);

  const handleSubmit = () => {
    let visaBookings = updatedBookings.map((booking) => ({
      _id: booking._id,
      paid: booking.paid
    }));
    const data = watch();
    data.pay = toPay;
    data.visaBookings = visaBookings;

    // console.log(data)
    updateApi({
      _id: accountId,
      api: 'account',
      data,
      dispatch,
      fetchList: fetchData,
      toggle,
      reset,
      removeSelection
    });
  };

  useEffect(() => {
    if (bookingTotal < toPay) {
      toast.error('Total Price is greater than Remaining Price');
      setToPay(bookingTotal);
    }
    let remainingToPay = toPay;
    const bookingsInReverse = [...visaBookings].reverse();
    const newBookings = bookingsInReverse
      .map((booking) => {
        const remainingOnBooking = booking.total - (booking.paid ?? 0);
        if (remainingToPay >= remainingOnBooking) {
          remainingToPay -= remainingOnBooking;
          return { ...booking, paid: booking.total, remaining: 0 };
        } else {
          const updatedPaid = (booking.paid ?? 0) + remainingToPay;
          remainingToPay = 0;
          return { ...booking, paid: updatedPaid };
        }
      })
      .reverse();

    setUpdatedBookings(newBookings);
    let remaining = bookingTotal - toPay;
    setRemaining(remaining);
  }, [toPay, selectedChildIds]);
  const handleToPay = (event) => {
    let value = Number(event.target.value);
    setToPay(value);
  };

  const paymentDescriptionField = [
    {
      name: 'paymentDescription'
    }
  ];
  let thStyle =
    'border-b-2 border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';

  return (
    <div>
      {!testValidityRefer ? (
        <Typography variant='h1' component='h2' color={'error'}>
          Error: Should be Same Refer
        </Typography>
      ) : (
        <div>
        <h3>Refer Name: {accountItem?.agent?.fullName}</h3>
          <table className='min-w-full table-auto border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className={thStyle}>Passport #</th>
                <th className={thStyle}>Total</th>
                <th className={thStyle}>Remaining</th>
                <th className={thStyle}>Pay</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {updatedBookings.map((item) => (
                <tr key={item._id}>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {item.passport.passportNumber}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                    {item.total}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                    {item.total - (item.paid ?? 0)}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                    <CustomTextField
                      disabled
                      fullWidth
                      value={item.paid}
                      type={'number'}
                      sx={{ mb: 4 }}
                      placeholder={0}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
        </div>
      )}
      <div>
        <p>Amount To Pay: {bookingTotal}.00 Rs</p>
        <CustomTextField
          fullWidth
          type={'number'}
          sx={{ mb: 4 }}
          label={'Pay'}
          value={toPay}
          onChange={handleToPay}
          placeholder={'Enter Amount to Pay'}
        />
        <CustomTextField
          disabled
          fullWidth
          value={remaining}
          type={'number'}
          sx={{ mb: 4 }}
          label={'Remaining'}
          placeholder={0}
        />
        <div className='mt-4'>
          <DatePickerHookField
            name='date'
            placeholder='Payment Method Date'
            required={true}
            control={control}
            errors={errors}
          />
        </div>
        <div className='my-2'>
          <CustomOpenDrawer
            ButtonTitle='Add Payment Method'
            drawerTitle='Add Payment Method'
            Form={IdNameForm}
            fetchApi={fetchPaymentMethod}
            formName='Payment Method'
            api='payment-method'
          />
        </div>
        <SelectHookField
          control={control}
          name='paymentMethod'
          showValue='name'
          options={paymentMethod ?? []}
          label='Payment Method'
          placeholder='Payment Method'
        />

        <CustomHookTextField
          chooseFields={paymentDescriptionField}
          control={control}
          errors={errors}
        />
        <Button color='primary' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AccountPayForm;
