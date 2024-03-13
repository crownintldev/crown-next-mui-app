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
  visaFee: '',
  processingFee: ''
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
  const [payMethod, setPayMethod] = useState('confirmed');
  const [supplierVisa, setSupplierVisa] = useState(null);
  const category = useSelector((state) => state?.visaCategory?.data);
  const destination = useSelector((state) => state?.visaDestination?.data);
  const type = useSelector((state) => state?.visaType?.data);
  const duration = useSelector((state) => state?.visaDuration?.data);

  const supplier = useSelector((state) =>
    state?.supplier?.data?.find(
      (item) => item._id === editId?.supplierVisaService?.supplier?._id
    )
  );
  useEffect(() => {
    dispatch(fetchVisaCategory({}));
    dispatch(fetchVisaDestination({}));
    dispatch(fetchVisaType({}));
    dispatch(fetchVisaDuration({}));
    dispatch(fetchSupplier({}));
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

  // find supplier visa service
  const selectDestination = watch('destination');
  const selectCategory = watch('category');
  const selectDuration = watch('duration');
  const selectType = watch('type');
  const selectSupplier = watch('supplier');
  // console.log(getValues('destination'))
  // console.log(selectDestination, selectCategory, selectDuration, selectType)

  useEffect(() => {
    if (
      selectDestination &&
      selectCategory &&
      selectDuration &&
      selectType &&
      selectSupplier
    ) {
      fetchActionData(
        () =>
          findSupplierVisa({
            destination: selectDestination,
            category: selectCategory,
            type: selectType,
            duration: selectDuration,
            supplier: selectSupplier
          }),
        setSupplierVisa
      );
    }
  }, [selectDestination, selectCategory, selectDuration, selectType]);

  useEffect(() => {
    if ((editId && editId?.processing) || editId?.confirmed) {
    } else {
      setValue('totalFee', supplierVisa?.confirmed?.totalFee);
      setValue('visaFee', supplierVisa?.processing?.visaFee);
      setValue('processingFee', supplierVisa?.processing?.processingFee);
      setValue('supplierVisaService', supplierVisa?._id);
    }
  }, [supplierVisa]);

  // -- end find supplier visa service

  // editId handle
  useEffect(() => {
    if (editId) {
      Object.keys(editId).forEach((key) => {
        setValue(key, editId[key]);
      });
      setValue('totalFee', editId?.confirmed?.totalFee);
      setValue('processingFee', editId?.processing?.processingFee);
      setValue('visaFee', editId?.processing?.visaFee);
      setValue('category', editId?.category?._id);
      setValue('type', editId?.type?._id);
      setValue('duration', editId?.duration?._id);
      setValue('destination', editId?.destination?._id);
      setValue('supplier', editId?.supplierVisaService?.supplier?._id);
    } else {
      reset();
    }
  }, [setValue, editId]);

  const handleClose = () => {
    toggle();
    reset();
  };

  const onSubmit = async (data) => {
    if (data.supplierVisaService) {
      updateApi({
        _id: data.supplierVisaService._id,
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
    // payMethod === 'confirmed'
    //   ? [
    {
      name: 'supplier',
      disabled: true,
      value: supplier?.name,
      myvalue: true
    },
    {
      name: 'totalFee',
      type: 'number',
      placeholder: 'Enter Total Fee',
      label: 'Confirmed - Total Fee',
      value: watch('totalFee'),
      myvalue: true
    },
    //   ]
    // : [
    {
      name: 'processingFee',
      type: 'number',
      placeholder: 'Enter Processing Fee',
      label: 'Processing - Processing Fee',
      value: watch('processingFee'),
      myvalue: true
    },
    {
      name: 'visaFee',
      placeholder: 'Enter Visa Fee',
      type: 'number',
      label: 'Processing - Visa Fee',
      value: watch('visaFee'),
      myvalue: true
    }
  ];
  // ]

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
        {/* choose Payment Field */}
        {/* <SelectField
          options={['Confirmed', 'Processing']}
          label='Select Payment Method'
          placeholder={'Select Payment Method'}
          value={payMethod}
          setPayMethod={setPayMethod}
          disableClearable={true}
        /> */}

        <CustomHookTextField
          chooseFields={choosePaymentMethod}
          control={control}
          errors={errors}
          required={true}
        />
        {!supplierVisa && (
          <CustomOpenDrawer
            ButtonTitle='Supplier Visa Service'
            drawerTitle='Add Supplier Visa Service'
            Form={SupplierVisaForm}
            fetchApi={fetchSupplierVisaService}
            api='supplier-visa-service'
            anchor='right'
          />
        )}
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
