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
  fetchInsuranceCategory,
  fetchInsuranceCompany,
  fetchInsuranceDuration,
  fetchInsurance,
  fetchInsuranceType,
  fetchPaymentMethod,
  fetchSupplier
} from 'src/store';

// action
import { createApi, updateApi } from 'src/action/function';

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField';
import EditFilesUploader from 'src/common/fileUpload/EditFileUploader';
import FilesUploader from 'src/common/fileUpload/FilesUploader';
import dayjs from 'dayjs';
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField';
import SelectHookField from 'src/common/dataEntry/SelectHookField';
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer';
import SupplierForm from '../supplier/SupplierForm';
import IdNameForm from '../idnameForm/IdNameForm';

const schema = yup.object().shape({
  name: yup.string().required('required'),
  insuranceCost: yup.number().required('required')
});

const defaultValues = {
  name: '',
  by: '',
  onModel: '',
  remarks: '',
  insuranceCost: '',
  sellingCost: '',
  profit: '',
  discount: '',
  total: '',
  insuranceCompany: '',
  type: '',
  category: '',
  duration: '',
  paymentMethod: '',
  supplier: '',
  files: []
};

const InsuranceForm = ({
  toggle,
  fetchApi,
  setFormSize,
  api = 'insurance',
  _id,
  stateSelector,
  removeSelection
}) => {
  const dispatch = useDispatch();
  let editId = useSelector((state) =>
    state[stateSelector]?.data?.find((item) => item._id === _id)
  );

  // states
  const [files, setFiles] = useState([]);
  const [previousFiles, setPreviousFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);
  // selector redux
  // onModel
  const clients = useSelector((state) => state.client?.data);
  const company = useSelector((state) => state.company?.data);
  const agents = useSelector((state) => state.agent?.data);
  //
  const supplier = useSelector((state) => state?.supplier?.data);
  const paymentMethod = useSelector((state) => state?.paymentMethod?.data);
  const insuranceCategory = useSelector((state) => state?.insuranceCategory?.data);
  const insuranceCompany = useSelector((state) => state?.insuranceCompany?.data);
  const insuranceDuration = useSelector((state) => state?.insuranceDuration?.data);
  const insuranceType = useSelector((state) => state?.insuranceType?.data);

  useEffect(() => {
    setFormSize(400);
    dispatch(fetchAgent({ limit: 100 }));
    dispatch(fetchClient({ limit: 100 }));
    dispatch(fetchCompany({ limit: 100 }));
    dispatch(fetchSupplier({ limit: 1000 }));
    dispatch(fetchPaymentMethod({ limit: 1000 }));
    dispatch(fetchInsuranceCategory({ limit: 100 }));
    dispatch(fetchInsuranceCompany({ limit: 100 }));
    dispatch(fetchInsuranceDuration({ limit: 100 }));
    dispatch(fetchInsuranceType({ limit: 100 }));
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
      setPreviousFiles(editId.files);
    } else {
      reset();
    }
  }, [setValue, editId]);

  const insuranceCost = watch('insuranceCost');
  let sellingPrice = watch('sellingCost');
  let discount = watch('discount');

  useEffect(() => {
    let profit = sellingPrice - insuranceCost - discount;
    setValue('profit', profit);
  }, [sellingPrice, insuranceCost, discount]);

  const handleClose = () => {
    toggle();
    reset();
    removeSelection();
  };

  let byItems = [];
  const watchedOnModel = watch('onModel');
  if (watchedOnModel === 'Client') {
    byItems = clients;
  } else if (watchedOnModel === 'Agent') {
    byItems = agents;
  } else if (watchedOnModel === 'Company') {
    byItems = company;
  }

  const byItem = byItems.map((item) => ({
    name: `${item.fullName || item.companyName} ${item.phone}`,
    _id: item._id
  }));

  //************************** */ onSubmit
  const onSubmit = async (data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== 'files') {
        formData.append(key, data[key]);
      }
    });
    data?.files?.forEach((file) => {
      formData.append('files', file);
    });

    // const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/${api}/create`, formData)
    if (editId) {
      updateApi({
        _id,
        api: 'insurance',
        data: formData,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    } else {
      createApi({
        api: 'insurance',
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
      name: 'name',
      placeholder: `Enter Name`,
      label: `Name`
    },
  ];
  const pricingFields = [
    {
      name: 'insuranceCost',
      placeholder: `Insurance Cost`,
      type: 'number'
    },
    {
      name: 'sellingCost',
      placeholder: `Selling Price`,
      label: `Selling Price`,
      type: 'number'
    },
    {
      name: 'discount',
      placeholder: `0`,
      type: 'number'
    },
    {
      name: 'profit',
      placeholder: `ticket cost - selling cost`,
      disabled: true,
      type: 'number'
    }
  ];
  const remarksField=[
    {
      textarea:true,
      name: 'remarks',
      placeholder: `Enter remarks`,
      label: `Remarks`,
    },
  ]

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomHookTextField
          chooseFields={chooseFields}
          control={control}
          errors={errors}
        />
        <SimpleSelectHookField
          control={control}
          errors={errors}
          name={'onModel'}
          options={['Client', 'Company', 'Agent']}
          label={'Refer Category'}
          placeholder='Select Refer'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='by'
          options={byItem ?? []}
          showValue='name'
          label='Refer'
          placeholder='Choose Refer'
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
        <CustomOpenDrawer
          ButtonTitle='Add Insurance Category'
          drawerTitle='Add Insurance Category'
          Form={IdNameForm}
          fetchApi={fetchInsuranceCategory}
          formName='Insurance Category'
          api='insurance-category'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='category'
          options={insuranceCategory ?? []}
          showValue='name'
          label='Category'
          placeholder='Choose Category'
        />
        <CustomOpenDrawer
          ButtonTitle='Add Insurance Type'
          drawerTitle='Add Insurance Type'
          Form={IdNameForm}
          fetchApi={fetchInsuranceType}
          formName='Insurance Type'
          api='insurance-type'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='type'
          options={insuranceType ?? []}
          showValue='name'
          label='Type'
          placeholder='Choose Type'
        />
        <CustomOpenDrawer
          ButtonTitle='Add Insurance Duration'
          drawerTitle='Add Insurance Duration'
          Form={IdNameForm}
          fetchApi={fetchInsuranceDuration}
          formName='Insurance Duration'
          api='insurance-duration'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='duration'
          options={insuranceDuration ?? []}
          showValue='name'
          label='Duration'
          placeholder='Choose Duration'
        />
        <CustomOpenDrawer
          ButtonTitle='Add Insurance Company'
          drawerTitle='Add Insurance Company'
          Form={IdNameForm}
          fetchApi={fetchInsuranceCompany}
          formName='Insurance Company'
          api='insurance-company'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='insuranceCompany'
          options={insuranceCompany ?? []}
          showValue='name'
          label='Company'
          placeholder='Choose Company'
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
          chooseFields={pricingFields}
          control={control}
          errors={errors}
        />
        <CustomHookTextField
          chooseFields={remarksField}
          control={control}
          errors={errors}
        />
        {!editId ? (
          <Box sx={{ width: '200px' }}>
            <Controller
              name='files'
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <label htmlFor='files'>Upload Files</label>
                  <FilesUploader setFiles={setFiles} files={files} onChange={onChange} />
                </>
              )}
            />
          </Box>
        ) : (
          <Box sx={{ width: '200px' }}>
            <Controller
              name='files'
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <label htmlFor='files'>Upload Files</label>
                  <EditFilesUploader
                    setFiles={setFiles}
                    previousFiles={previousFiles}
                    setPreviousFiles={setPreviousFiles}
                    removeFiles={removeFiles}
                    setRemoveFiles={setRemoveFiles}
                    files={files}
                    prevFiles={editId?.files}
                    onChange={onChange}
                  />
                </>
              )}
            />
          </Box>
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

export default InsuranceForm;
