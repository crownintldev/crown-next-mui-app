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
import { fetchSupplierAccount } from 'src/store';

// action
import { createApi, updateApi } from 'src/action/function';

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField';

const schema = yup.object().shape({
  // invoiceDate: yup.string().required('required'),
  // ticketNumber: yup.string().typeError('Ticket Number is required').required('required'),
  // customer: yup.string().required('required')
});

const defaultValues = {
  supplierId: '',
  supplierName: '',
  total: 0,
  paid: 0,
  discount: 0,
  remaining: 0
};

const SupplierAccountForm = ({
  toggle,
  fetchApi = fetchSupplierAccount,
  setFormSize,
  api = 'supplier-account',
  _id,
  stateSelector = 'supplierAccount',
  removeSelection
}) => {
  const dispatch = useDispatch();

  let editId = useSelector((state) =>
    state[stateSelector]?.data?.find((item) => item.supplierId === _id)
  );

  // console.log(_id);
  // console.log(editId)
  useEffect(() => {
    setFormSize(400);
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
  const total = Number(watch('total'));
  const discount = Number(watch('discount'));
  const paid = Number(watch('paid'));

  useEffect(() => {
    let remaining = (Number(total) ?? 0) - (Number(discount) ?? 0) - (Number(paid) ?? 0);
    setValue('remaining', remaining);
  }, [discount, paid, total]);

  const handleClose = () => {
    toggle();
    reset();
    removeSelection();
  };

  //************************** */ onSubmit
  const onSubmit = async (data) => {
    data.supplierId = _id;
    // const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/${api}/create`, formData)
    if (editId.notcreated === false) {
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
    } else if (editId.notcreated === true) {
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
      name: 'supplierName'
    },
    {
      name: 'total',
      disable: true
    },

    {
      name: 'paid',
      placeholder: `0`,
      type: 'number'
    },
    {
      name: 'discount',
      placeholder: `0`,
      type: 'number'
    },
    {
      name: 'remaining',
      disable: true
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

export default SupplierAccountForm;
