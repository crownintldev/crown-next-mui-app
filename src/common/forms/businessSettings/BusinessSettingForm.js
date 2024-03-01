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

// action
import { createApi, updateApi } from 'src/action/function';

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField';
import SingleFileUploader from 'src/common/fileUpload/SingleFileUploader';

const schema = yup.object().shape({
  businessName: yup.string().required('required'),
  phone1: yup.string().required('required'),
  phone2: yup.string().required('required'),
  email: yup.string().required('required'),
  businessAddress: yup.string().required('required')
});

const defaultValues = {
  businessName: '',
  phone2: '',
  phone1: '',
  email: '',
  businessAddress: ''
};

const PaymentHeadForm = ({
  toggle,
  fetchApi,
  setFormSize,
  api = 'business-setting',
  _id,
  stateSelector = 'paymentHead',
  removeSelection
}) => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state?.paymentHeadType?.data);
  let editId = useSelector((state) =>
    state[stateSelector]?.data?.find((item) => item._id === _id)
  );

  // states
  const [file, setFile] = useState(null);

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
    setValue('logo', file);
  }, [file]);
  useEffect(() => {
    if (editId) {
      Object.keys(editId).forEach((key) => {
        setValue(key, editId[key]);
      });
      setFile(editId.logo);
    } else {
      reset();
    }
  }, [setValue, editId]);

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

    if (editId) {
      updateApi({
        _id,
        api,
        data: formData,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    } else {
      createApi({
        api,
        data: formData,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    }
  };

  const chooseFields = [
    {
      name: 'businessName'
    },
    {
      name: 'phone1'
    },
    {
      name: 'phone2'
    },
    {
      name: 'email'
    },
    {
      name: 'businessAddress'
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
        <SingleFileUploader file={file} setFile={setFile} />
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

export default PaymentHeadForm;
