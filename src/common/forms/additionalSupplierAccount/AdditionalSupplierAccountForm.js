import React, { useEffect, useState } from 'react';

// ** Third Party Imports
import * as yup from 'yup';

// ** MUI Imports
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';

// yup
import { yupResolver } from '@hookform/resolvers/yup';

// hookform
import { Controller, useForm } from 'react-hook-form';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentMethod, fetchAdditionalSupplierAccount } from 'src/store';

// action
import { createApi, updateApi } from 'src/action/function';

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField';
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer';
import IdNameForm from '../idnameForm/IdNameForm';
import SelectHookField from 'src/common/dataEntry/SelectHookField';
import DatePickerHookField from 'src/common/dataEntry/DatePickerHookField';

const schema = yup.object().shape({
  // invoiceDate: yup.string().required('required'),
  // ticketNumber: yup.string().typeError('Ticket Number is required').required('required'),
  // customer: yup.string().required('required')
});

const defaultValues = {
  additionalSupplierId: '',
  additionalSupplierName: '',
  total: 0,
  paid: 0,
  discount: 0,
  tdiscount: 0,
  remaining: 0,
  date: '',
  pay: 0,
  notcreated: '',
  paymentMethod: '',
  paymentDescription: ''
};

const AdditionalSupplierAccountForm = ({
  toggle,
  fetchApi = fetchAdditionalSupplierAccount,
  setFormSize,
  api = 'additional-supplier-account',
  _id,
  stateSelector = 'additionalSupplierAccount',
  removeSelection
}) => {
  const dispatch = useDispatch();

  let editId = useSelector((state) =>
    state[stateSelector]?.data?.find((item) => item.additionalSupplierId === _id)
  );
  // console.log(editId)
  // payment method
  const paymentMethod = useSelector((state) => state?.paymentMethod?.data);

  useEffect(() => {
    setFormSize(400);
    dispatch(fetchPaymentMethod({ limit: 2000 }));
  }, []);

  const {
    reset,
    control,
    setError,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (editId) {
      Object.keys(editId).forEach((key) => {
        setValue(key, editId[key]);
      });
    } else {
      reset();
    }
  }, [setValue, editId]);

  // calculation getting values
  const discount = Number(watch('discount'));
  const paid = Number(watch('paid'));
  const pay = Number(watch('pay'));

  useEffect(() => {
    let remaining =
      (Number(editId.total) ?? 0) -
      (Number(editId.tdiscount) ?? 0) -
      (Number(discount) ?? 0) -
      (Number(editId.paid) ?? 0) -
      (Number(pay) ?? 0);
    setValue('remaining', remaining);
  }, [editId, pay, discount]);

  const handleClose = () => {
    toggle();
    reset();
    removeSelection();
  };

  //************************** */ onSubmit
  const onSubmit = async (data) => {
    data.supplierId = _id;
    // const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/${api}/create`, formData)
    if (editId?.notcreated === false) {
      updateApi({
        _id,
        api,
        data: data,
        dispatch,
        fetchList: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    } else if (editId?.notcreated === true) {
      createApi({
        api,
        data: data,
        dispatch,
        fetchList: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    }
  };

  const chooseFields = [
    {
      name: 'additionalSupplierName',
      disabled: true
    },
    {
      name: 'total',
      disabled: true
    },

    {
      name: 'paid',
      placeholder: `0`,
      type: 'number',
      disabled: true
    },
    {
      name: 'pay',
      type: 'number'
    },
    {
      name: 'tdiscount',
      placeholder: `0`,
      label: 'Total Discount',
      type: 'number',
      disabled: true
    },
    {
      name: 'discount',
      placeholder: `0`,
      type: 'number'
    },
    {
      name: 'remaining',
      disabled: true
    }
  ];
  const paymentDescriptionField = [
    {
      name: 'paymentDescription'
    }
  ];
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomHookTextField
          chooseFields={chooseFields}
          control={control}
          errors={errors}
        />

        <div className='mt-2 mb-2'>
          <DatePickerHookField
            name='date'
            placeholder='Payment Method Date'
            required={true}
            control={control}
            errors={errors}
          />
        </div>
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
          <Button type='submit' variant='contained' sx={{ mr: 3 }}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AdditionalSupplierAccountForm;
