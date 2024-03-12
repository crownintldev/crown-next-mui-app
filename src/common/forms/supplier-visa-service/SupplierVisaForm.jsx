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
  fetchSupplier,
  fetchVisaService
} from 'src/store';

// action
import { createApi, updateApi } from 'src/action/function';

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField';
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer';
import SelectHookField from 'src/common/dataEntry/SelectHookField';

//form
import IdNameForm from '../idnameForm/IdNameForm';
import SupplierForm from 'src/common/forms/supplier/SupplierForm';

const requiredError = ['category', 'destination', 'duration', 'type', 'supplier'];

const yupField = requiredError.reduce((acc, item) => {
  acc[item] = yup
    .string()
    .typeError('Field Should not be empty')
    .required('Field Should not be empty');

  return acc;
}, {});

const schema = yup.object().shape(yupField);

// const schema = yup.object().shape({
//   category: yup.string().typeError("Field Should not be empty").required("Field Should not be empty"),
//   destination: yup.string().typeError('Field Should not be empty').required('Field Should not be empty'),
//   duration: yup.string().typeError('Field Should not be empty').required('Field Should not be empty'),
//   type: yup.string().typeError('Field Should not be empty').required('Field Should not be empty'),
//   supplier: yup.string().typeError('Field Should not be empty').required('Field Should not be empty'),
// })

const defaultValues = {
  category: '',
  destination: '',
  duration: '',
  type: '',
  supplier: '',
  totalFee: 0,
  visaFee: 0,
  processingFee: 0,
  additionSupplierId: '',
  additionSupplierFee: ''
};

const SupplierVisaForm = ({
  toggle,
  fetchApi,
  // api = 'supplier-visa-service',
  _id,
  stateSelector,
  removeSelection
}) => {
  let api = 'supplier-visa-service';
  // console.log("_id",_id)
  const dispatch = useDispatch();
  let editId = useSelector((state) =>
    state[stateSelector]?.data?.find((item) => item._id === _id)
  );
  // console.log(editId)
  // ** State
  const [payMethod, setPayMethod] = useState('confirmed');
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

  // console.log(supplier)

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

  useEffect(() => {
    if (editId) {
      setValue('category', editId?.category?._id);
      setValue('type', editId?.type?._id);
      setValue('duration', editId?.duration?._id);
      setValue('destination', editId?.destination?._id);
      setValue('supplier', editId?.supplierVisaService?.supplier?._id);
      setValue('totalFee', editId?.supplierVisaService?.confirmed?.totalFee);
      setValue('processingFee', editId?.supplierVisaService?.processing?.processingFee);
      setValue('visaFee', editId?.supplierVisaService?.processing?.visaFee);
      setValue(
        'additionSupplierId',
        editId?.supplierVisaService?.additionSupplierId?._id
      );
      setValue('additionSupplierFee', editId?.supplierVisaService?.additionSupplierFee);
    } else {
      reset();
    }
  }, [setValue, editId]);

  const handleClose = () => {
    toggle();
    reset();
  };
  // console.log(watch())
  const onSubmit = async (data) => {
    console.log(data)
    if (editId) {
      updateApi({
        _id: editId.supplierVisaService._id,
        api,
        data,
        dispatch,
        fetchData: fetchVisaService,
        toggle,
        reset,
        removeSelection
      });
    } else {
      createApi({
        api,
        data,
        dispatch,
        fetchData: fetchVisaService,
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
        <CustomOpenDrawer
          ButtonTitle='Add Visa Category'
          drawerTitle='Add Visa Category Form'
          Form={IdNameForm}
          fetchApi={fetchVisaCategory}
          formName='Category'
          api='visa-category'
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
        {/* type */}
        <CustomOpenDrawer
          ButtonTitle='Add Visa Type'
          drawerTitle='Add Visa Type Form'
          Form={IdNameForm}
          fetchApi={fetchVisaType}
          formName='Type'
          api='visa-type'
        />
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
        <CustomOpenDrawer
          ButtonTitle='Add Visa Duration'
          drawerTitle='Add Visa Duration Form'
          Form={IdNameForm}
          fetchApi={fetchVisaDuration}
          formName='Type'
          api='visa-duration'
        />
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
        <CustomOpenDrawer
          ButtonTitle='Add Visa Destination'
          drawerTitle='Add Visa Destination Form'
          Form={IdNameForm}
          fetchApi={fetchVisaDestination}
          formName='Destination'
          api='visa-destination'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='destination'
          options={destination ?? []}
          showValue='name'
          label='Destination'
          placeholder='Choose Destination'
        />
        {/* supplier */}
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
        {/* choose Payment Field */}
        {/* <SelectField
          options={['confirmed', 'processing']}
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
        {/* additionSupplierId */}
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
        {/* <CustomHookTextField chooseFields={chooseFields} control={control} errors={errors} /> */}
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

export default SupplierVisaForm;
