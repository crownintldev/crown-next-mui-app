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
  accountIds: yup.array().of(yup.string()).required('Passports are required.')

  // visaBookingIds: yup.array().of(yup.string()).required('Visa booking IDs are required.'),
  // visaId: yup.string().required('Visa ID is required.'),
  // status: yup.string().required('Status is required.')
});

const defaultValues = {
  accountIds: [],
  paid: 0,
  pay: 0,
  paymentMethod:"",
  paymentDescription: '',
  increment: 0,
  total: 0,
  discount: 0
};

// ------------------visaBooking Form-----------------------
const EditAccountForm = ({ toggle, _id: ids, removeSelection }) => {
  const theme = useTheme();
  // ** State
  const dispatch = useDispatch();

  const accountItems = useSelector((state) =>
    ids
      .map(
        (id) =>
          state.account.data.length > 0 &&
          state.account.data.find((item) => item._id === id)
      )
      .map((item) => {
        return {
          visaBookingDetails: item?.visaBookingIds?.map((visaBooking) => ({
            passportNumber: visaBooking.passport?.passportNumber,
            givenName: visaBooking.passport?.givenName
          })),
          total: item?.total,
          discount: item?.discount,
          decrease: item?.decrease,
          subTotal: item?.subTotal,
          paid: item?.paid,
          remaining: item?.remaining,

          _id: item?._id,
          ReferName: item?.by?.fullName ? item?.by?.fullName : item?.by?.companyName,
          onModel: item?.onModel
        };
      })
  );
  const paymentMethod = useSelector((state) => state?.paymentMethod?.data);
  const testValidityRefer = isAllSameinArray(accountItems, 'ReferName');

  useEffect(() => {
    dispatch(fetchPaymentMethod({}));
  }, [dispatch]);
  const {
    reset,
    control,
    setError,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [amount, setAmount] = useState({
    total: 0,
    paid: 0
  });

  const handleAmountChange = (event) => {
    const { name, value: newValue } = event.target;
    setAmount({ ...amount, [name]: newValue });
  };
  const totalAmount = Number(watch('total'));
  const paidAmount = Number(watch('paid'));
  const pay = Number(watch('pay'));
  const discountAmount = watch('discount') ? Number(watch('discount')) : 0;

  const amountRemaining = totalAmount - (paidAmount + discountAmount + pay);

  // console.log('reming data', paidAmount, discountAmount, typeof paidAmount, typeof discountAmount)
  useEffect(() => {
    if (ids.length > 0) {
      setValue('accountIds', ids);

      const data = accountItems.reduce(
        (acc, item) => {
          const { total = 0, subTotal = 0, paid = 0, discount = 0 } = item;
          acc.totalAmount += subTotal;
          acc.paidAmount += paid;
          acc.discount += discount;

          return acc;
        },
        { totalAmount: 0, paidAmount: 0, remainingAmount: 0, discount: 0 }
      );

      setValue('paid', data.paidAmount);
      setValue('total', data.totalAmount);
      setValue('discount', data.discount);
    }
  }, [ids, setValue]);

  const handleClose = () => {
    toggle();
    reset();
  };

  const onSubmit = async (data) => {
    console.log(data)
    updateApi({
      _id: ids[0],
      api: 'account',
      data,
      dispatch,
      fetchList: fetchData,
      toggle,
      reset,
      removeSelection
    });
  };

  const renderSelectedValue = (selectedIds) => {
    return selectedIds
      .map((id) => {
        const item = accountItems.find((item) => item._id === id);

        return item
          ? item.visaBookingDetails.map((item, index) => `${item.passportNumber} `)
          : '';
      })
      .filter(Boolean) // Removes any undefined or empty values
      .join(', ');
  };
  const chooseFields = [
    {
      name: 'total',
      type: 'number',
      disabled:true
    },
    {
      name: 'paid',
      type: 'number',
      disabled:true
    },
    {
      name: 'pay',
      type: 'number'
    }
  ];
  const paymentDescriptionField = [
    {
      name: 'paymentDescription'
    }
  ];
  return (
    <div>
      {!testValidityRefer ? (
        <Typography variant='h1' component='h2' color={'error'}>
          Error: Should be Same Refer
        </Typography>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='accountIds'
            control={control}
            render={({ field }) => (
              <CustomTextField
                sx={{ mb: 6 }}
                select
                fullWidth
                label='Passport Selected'
                id='select-multiple-checkbox'
                SelectProps={{
                  MenuProps,
                  displayEmpty: true,
                  multiple: true,
                  value: field.value,
                  onChange: field.onChange,
                  renderValue: renderSelectedValue
                }}
              >
                <MenuItem value='' disabled>
                  Select Passport
                </MenuItem>
                {accountItems.map((item, index) => (
                  <MenuItem key={index} value={`${item._id}`} className='!overflow-auto'>
                    {item.visaBookingDetails &&
                      item.visaBookingDetails.length > 0 &&
                      item.visaBookingDetails.map(
                        (item, index) => `${item.passportNumber} `
                      )}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <CustomTextField
            fullWidth
            type={'text'}
            value={accountItems[0]?.onModel}
            sx={{ mb: 4 }}
            label={'Refer Category'}
            disabled
          />
          <CustomTextField
            fullWidth
            type={'text'}
            value={accountItems[0]?.ReferName}
            sx={{ mb: 4 }}
            label={'Refer Name'}
            disabled
          />
          <CustomHookTextField
            chooseFields={chooseFields}
            control={control}
            errors={errors}
          />
          <Controller
            name={'remaining'}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                disabled
                fullWidth
                type={'number'}
                value={amountRemaining}
                sx={{ mb: 4 }}
                label={'Remaining Amount'}
                placeholder={'Enter Remaining Amount'}
              />
            )}
          />
          <CustomOpenDrawer
            ButtonTitle='Add Payment Method'
            drawerTitle='Add Payment Method'
            Form={IdNameForm}
            fetchApi={fetchPaymentMethod}
            formName='Payment Method'
            api='payment-method'
          />
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' color='primary' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default EditAccountForm;
