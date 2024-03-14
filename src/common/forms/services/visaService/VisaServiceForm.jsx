import React, { useEffect, useState } from 'react';

// ** Third Party Imports
import * as yup from 'yup';

// ** MUI Imports
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';

// yup
import { yupResolver } from '@hookform/resolvers/yup';

// hookform
import { useForm } from 'react-hook-form';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVisaCategory,
  fetchVisaDestination,
  fetchVisaDuration,
  fetchVisaType,
  fetchSupplier
} from 'src/store';

// action
import { createApi, updateApi } from 'src/action/function';

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField';
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer';
import SelectHookField from 'src/common/dataEntry/SelectHookField';

//form
import SupplierVisaForm from '../../supplier-visa-service/SupplierVisaForm';
import { fetchSupplierVisaService } from 'src/store';
import axiosInstance from 'src/utils/axiosInstance';
import { fetchActionData } from 'src/action/fetchData';
import SupplierForm from '../../supplier/SupplierForm';

const requiredError = ['category', 'destination', 'duration', 'type'];

const yupField = requiredError.reduce((acc, item) => {
  acc[item] = yup
    .string()
    .typeError('Field Should not be empty')
    .required('Field Should not be empty');

  return acc;
}, {});

const schema = yup.object().shape(yupField);

const defaultValues = {
  category: '',
  destination: '',
  duration: '',
  type: '',
  supplierVisaService: '',
  supplier: '',
  totalFee: '',
  supplierTotalFee: '',
  visaFee: '',
  supplierVisaFee: '',
  processingFee: '',
  supplierProcessingFee: '',
  supplier: '',
  additionSupplierId: '',
  additionSupplierFee: ''
};

export const findSupplierVisa = (data) => {
  return axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API}/supplier-visa-service/findSupplierVisa`,
    data
  );
};

const VisaServiceForm = ({
  toggle,
  fetchApi,
  api = 'visa-service',
  _id,
  stateSelector,
  removeSelection
}) => {
  const dispatch = useDispatch();
  let editId = useSelector((state) =>
    state[stateSelector]?.data?.find((item) => item._id === _id)
  );
  // console.log(editId);
  // ** State
  const category = useSelector((state) => state?.visaCategory?.data);
  const destination = useSelector((state) => state?.visaDestination?.data);
  const type = useSelector((state) => state?.visaType?.data);
  const duration = useSelector((state) => state?.visaDuration?.data);

  const supplier = useSelector((state) =>
    state?.supplier?.data?.map((item) => ({
      name: `${item.name} ${item.phone}`,
      _id: item._id
    }))
  );
  useEffect(() => {
    dispatch(fetchVisaCategory({limit:1000}));
    dispatch(fetchVisaDestination({limit:1000}));
    dispatch(fetchVisaType({limit:1000}));
    dispatch(fetchVisaDuration({limit:1000}));
    dispatch(fetchSupplier({limit:1000}));
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



  // editId handle
  useEffect(() => {
    if (editId) {
      Object.keys(editId).forEach((key) => {
        setValue(key, editId[key]);
      });
      setValue('totalFee', editId?.confirmed?.totalFee);
      setValue('supplierTotalFee', editId?.confirmed?.supplierTotalFee);
      setValue('processingFee', editId?.processing?.processingFee);
      setValue('supplierProcessingFee', editId?.processing?.supplierProcessingFee);
      setValue('visaFee', editId?.processing?.visaFee);
      setValue('supplierVisaFee', editId?.processing?.supplierVisaFee);
      setValue('category', editId?.category?._id);
      setValue('type', editId?.type?._id);
      setValue('duration', editId?.duration?._id);
      setValue('destination', editId?.destination?._id);
      setValue('supplier', editId?.supplier?._id);
      setValue('additionSupplierId', editId?.additionSupplierId?._id);
    } else {
      reset();
    }
  }, [setValue, editId]);

  const handleClose = () => {
    toggle();
    reset();
  };

  const onSubmit = async (data) => {
    if (editId) {
      updateApi({
        _id,
        api,
        data,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    } else {
      createApi({
        api,
        data,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    }
  };
  const choosePaymentMethod = [
    {
      name: 'supplierTotalFee',
      type: 'number',
      placeholder: 'Enter Supplier Total Fee',
      label: 'Confirmed - Supplier Total Fee'
    },
    {
      name: 'totalFee',
      type: 'number',
      placeholder: 'Sale Rate - Total Fee',
      label: 'Sale Rate - Confirmed Total Fee'
    },
    {
      name: 'supplierProcessingFee',
      type: 'number',
      placeholder: 'Enter Supplier Processing Fee',
      label: 'Supplier Processing Fee'
    },
    {
      name: 'processingFee',
      type: 'number',
      placeholder: 'Enter Processing Fee',
      label: 'Sale Rate - Processing Fee'
    },
    {
      name: 'supplierVisaFee',
      placeholder: 'Enter Supplier Visa Fee',
      type: 'number',
      label: 'Supplier Visa Fee'
    },
    {
      name: 'visaFee',
      placeholder: 'Enter Visa Fee',
      type: 'number',
      label: 'Sale Rate - Visa Fee'
    }
  ];
  const additionSupplierFee = [
    {
      name: 'additionSupplierFee',
      type: 'number'
    }
  ];
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* category */}
        <SelectHookField
          control={control}
          errors={errors}
          name='category'
          showValue='name'
          options={category ?? []}
          label='Category'
          placeholder='Choose Category'
        />
        {/* type */}
        <SelectHookField
          control={control}
          errors={errors}
          name='type'
          options={type ?? []}
          showValue='name'
          label='Type'
          placeholder='Choose Type'
        />
        {/* duration */}
        <SelectHookField
          control={control}
          errors={errors}
          name='duration'
          options={duration ?? []}
          showValue='name'
          label='Duration'
          placeholder='Choose Duration'
        />
        {/* destination */}
        <SelectHookField
          control={control}
          errors={errors}
          name='destination'
          options={destination ?? []}
          showValue='name'
          label='Destination'
          placeholder='Choose Destination'
        />
        <CustomOpenDrawer
          ButtonTitle='Add Supplier'
          drawerTitle='Add Supplier Form'
          Form={SupplierForm}
          fetchApi={fetchSupplier}
          formName='Supplier'
          api='supplier'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='supplier'
          options={supplier ?? []}
          showValue='name'
          label='Supplier'
          placeholder='Choose Supplier'
        />
        <CustomHookTextField
          chooseFields={choosePaymentMethod}
          control={control}
          errors={errors}
          required={true}
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='additionSupplierId'
          options={supplier ?? []}
          showValue='name'
          label='Additional Supplier'
          placeholder='Choose Additional Supplier'
        />
        <CustomHookTextField
          chooseFields={additionSupplierFee}
          control={control}
          errors={errors}
          required={true}
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

export default VisaServiceForm;
