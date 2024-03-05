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
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer';
import SelectHookField from 'src/common/dataEntry/SelectHookField';
import EditFilesUploader from 'src/common/fileUpload/EditFileUploader';
import FilesUploader from 'src/common/fileUpload/FilesUploader';
import dayjs from 'dayjs';
import IdNameForm from '../idnameForm/IdNameForm';
import { fetchSubsidiaryType, fetchSubsidiary, fetchPaymentMethod } from 'src/store';

const schema = yup.object().shape({
  // invoiceDate: yup.string().required('required'),
  // ticketNumber: yup.string().typeError('Ticket Number is required').required('required'),
  // customer: yup.string().required('required')
});

const defaultValues = {
  title: '',
  type: '',
  amount: '',
  paymentMethod: '',
  paymentDescription: '',
  files: []
};

const SubsidiaryForm = ({
  toggle,
  fetchApi,
  setFormSize,
  api = 'payment-head',
  _id,
  stateSelector = 'paymentHead',
  removeSelection
}) => {
  const dispatch = useDispatch();
  let editId = useSelector((state) =>
    state[stateSelector]?.data?.find((item) => item._id === _id)
  );
  const type = useSelector((state) => state?.subsidiaryType?.data);
  const paymentMethod = useSelector((state) => state?.paymentMethod?.data);

  // states
  const [files, setFiles] = useState([]);
  const [previousFiles, setPreviousFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);

  useEffect(() => {
    setFormSize(400);
    dispatch(fetchSubsidiaryType({}));
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
      setPreviousFiles(editId?.files);
    } else {
      reset();
    }
  }, [setValue, editId]);

  const ticketCost = watch('ticketCost');
  let sellingPrice = watch('sellingPrice');
  let discount = watch('discount');

  useEffect(() => {
    let profit = ticketCost - sellingPrice;
    let total = profit - discount;
    setValue('total', total);
    setValue('profit', profit);
  }, [sellingPrice, ticketCost, discount]);

  const handleClose = () => {
    toggle();
    reset();
    removeSelection();
  };

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
        api,
        data: formData,
        dispatch,
        fetchData: fetchSubsidiary,
        toggle,
        reset,
        removeSelection
      });
    } else {
      createApi({
        api,
        data: formData,
        dispatch,
        fetchData: fetchSubsidiary,
        toggle,
        reset,
        removeSelection
      });
    }
  };

  const chooseFields = [
    {
      name: 'title',
      placeholder: `Enter Title`
    },

    {
      name: 'amount',
      placeholder: `Enter Amount`,
      type: 'number'
    },
   
  ];
  const paymentDescriptionField = [
    {
      name: 'paymentDescription'
    }
  ];
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomOpenDrawer
          ButtonTitle='Add Type'
          drawerTitle='Add Type Form'
          Form={IdNameForm}
          fetchApi={fetchSubsidiaryType}
          formName='Type'
          api='subsidiary-type'
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
        <CustomHookTextField
          chooseFields={chooseFields}
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
        <CustomHookTextField
          chooseFields={paymentDescriptionField}
          control={control}
          errors={errors}
        />
        {/* <SimpleSelectHookField
          control={control}
          errors={errors}
          name={'onModel'}
          options={['Account', 'SupplierAccount', 'Expense',"None"]}
          label={'Choose Category'}
          placeholder='Select Refer'
        /> */}
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

export default SubsidiaryForm;
