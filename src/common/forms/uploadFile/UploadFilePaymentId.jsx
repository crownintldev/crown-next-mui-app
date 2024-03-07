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
import {
  fetchAgent,
  fetchClient,
  fetchCompany,
  fetchPaymentMethod,
  fetchVisaBooking
} from 'src/store';

// action
import { createApi, updateApi } from 'src/action/function';

//dataEntry
import SingleFileUploader from 'src/common/fileUpload/SingleFileUploader';
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField';
import SelectHookField from 'src/common/dataEntry/SelectHookField';
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer';
import IdNameForm from '../idnameForm/IdNameForm';

const schema = yup.object().shape({});

const defaultValues = {
  file: '',
  paymentMethod: ''
};

const UploadFilePaymentId = ({
  toggle,
  fetchApi,
  setFormSize,
  api,
  _id,
  removeSelection
}) => {
  const dispatch = useDispatch();
  // states
  const [file, setFile] = useState(null);
  const paymentMethod = useSelector((state) => state?.paymentMethod?.data);

  useEffect(() => {
    setFormSize(400);
    dispatch(fetchPaymentMethod({}));
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

  const handleClose = () => {
    toggle();
    reset();
    removeSelection();
  };
  //************************** */ onSubmit
  const onSubmit = async (data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    createApi({
      completeApi: `${api}/insertDataCsv`,
      data: formData,
      dispatch,
      fetchData: fetchApi,
      toggle,
      reset,
      removeSelection
    });
  };


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SingleFileUploader file={file} setFile={setFile} />

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

export default UploadFilePaymentId;
