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
  fetchSupplierCategory,
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
  category: '',
};

const UploadFileSupplier = ({
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
  const category = useSelector(state => state?.supplierCategory?.data)

  useEffect(() => {
    setFormSize(400);
    dispatch(fetchSupplierCategory({}))
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
  useEffect(() => {
    setValue('file', file);
  }, [file]);
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
          ButtonTitle='Add Supplier Category'
          drawerTitle='Add Supplier Category'
          Form={IdNameForm}
          fetchApi={fetchSupplierCategory}
          formName='Category'
          api='supplier-category'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='category'
          showValue='name'
          options={category ?? []}
          label='Category'
          placeholder='Choose Category'
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

export default UploadFileSupplier;
