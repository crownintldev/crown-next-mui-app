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
  fetchInsuranceType,
  fetchInsuranceCategory,
  fetchInsuranceDuration,
  fetchVisaType
} from 'src/store';

// action
import { createApi, updateApi } from 'src/action/function';

//dataEntry
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField';
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer';
import SelectHookField from 'src/common/dataEntry/SelectHookField';
import DatePickerHookField from 'src/common/dataEntry/DatePickerHookField';
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField';
import EditFilesUploader from 'src/common/fileUpload/EditFileUploader';
import FilesUploader from 'src/common/fileUpload/FilesUploader';
import dayjs from 'dayjs';
import IdNameForm from '../idnameForm/IdNameForm';

const schema = yup.object().shape({
  // invoiceDate: yup.string().required('required'),
  // customer: yup.string().required('required')
});

const defaultValues = {
  name: '',
  by: '',
  onModel: '',
  remarks: '',
  insuranceCost: '',
  sellingPrice: '',
  profit: '',
  discount: '',
  total: '',
  insuranceCompany: '',
  type: '',
  category: '',
  duration: '',
  paymentMethod: '',
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
  // payment Method
  const paymentMethod = useSelector((state)=>state?.paymentMethod?.data);

  console.log('pay me',  paymentMethod)

  // insurance Items
  const insuranceType = useSelector((state) => state?.insuranceType?.data);
  const insuranceCategory = useSelector((state)=>state?.insuranceCategory?.data);
  const insuranceDuration = useSelector((state)=>state?.insuranceDuration?.data);

  // states
  const [files, setFiles] = useState([]);
  const [previousFiles, setPreviousFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);
  // onModel
  const clients = useSelector((state) => state.client?.data);
  const company = useSelector((state) => state.company?.data);
  const agents = useSelector((state) => state.agent?.data);

  useEffect(() => {
    setFormSize(400);
    dispatch(fetchAgent({ limit: 100 }));
    dispatch(fetchClient({ limit: 100 }));
    dispatch(fetchCompany({ limit: 100 }));
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

  useEffect(() => {
    if (editId) {
      Object.keys(editId).forEach((key) => {
        setValue(key, editId[key]);
      });
      setPreviousFiles(editId.files);
      setValue('invoiceDate', dayjs(editId.invoiceDate));
      setValue('by', editId.by._id);
      setValue('insuranceType', editId.insuranceType._id);
    } else {
      reset();
    }
  }, [setValue, editId]);

  const insuranceCost = watch('insuranceCost');
  let sellingPrice = watch('sellingPrice');
  let discount = watch('discount');

  
  useEffect(() => {

    // let profit = sellingPrice - ticketCost - discount;

    let profit = sellingPrice - insuranceCost;
    let total = profit - discount;
    setValue('total', total);
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
    console.log(data)
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


  const chooseFields1 = [
    {
      name: 'name',
      placeholder: `Enter Name`,
      label: `Name`
    },
    {
      name: 'insuranceCompany',
      placeholder: `Enter Insurance Company`,
      label: ` Insurance Company`,
    },
  ];
  const chooseFields2 = [
    {
      name: 'insuranceCost',
      placeholder: `Insurance Cost`,
      type: 'number'
    },
    {
      name: 'sellingPrice',
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
    },
    {
      name: 'total',
      placeholder: `profit - discount`,
      disabled: true,
      type: 'number'
    },
    {
        name: 'remarks',
        placeholder: 'Remarks'
    },
    {
        name: 'supplier',
        placeholder: 'Supplier ID'
    }
  ];
  // const paymentDescriptionField = [
  //   {
  //     name: 'paymentDescription'
  //   }
  // ];
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ pb: 2 }}></Box>
        <CustomHookTextField
          chooseFields={chooseFields1}
          control={control}
          errors={errors}
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
          name='type'
          showValue='name'
          options={insuranceType ?? []}
          label='Insurance Type'
          placeholder='Insurance Type'
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
          name='category'
          showValue='name'
          options={insuranceCategory ?? []}
          label='Insurance Category'
          placeholder='Insurance Category'
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
          name='duration'
          showValue='name'
          options={insuranceDuration ?? []}
          label='Insurance Duration'
          placeholder='Insurance Duration'
        />

        <CustomHookTextField
        chooseFields={chooseFields2}
        control={control}
        errors={errors}
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
