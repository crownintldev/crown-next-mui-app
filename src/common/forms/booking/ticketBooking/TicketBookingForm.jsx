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
import { fetchAgent, fetchClient, fetchCompany } from 'src/store';

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
import IdNameForm from '../../idnameForm/IdNameForm';

const schema = yup.object().shape({
  invoiceDate: yup.string().required('required'),
  ticketNumber: yup.string().typeError('Ticket Number is required').required('required'),
  customer: yup.string().required('required')
});

const defaultValues = {
  by: '',
  onModel: '',
  invoiceNumber: '',
  ticketNumber: '',
  invoiceDate: '',
  customer: '',
  airline: '',
  sellingPrice: '',
  profit: '',
  discount: '',
  total: '',
  sector: '',
  profit: '',
  paymentMethod: '',
  files: []
};

const TicketBookingForm = ({
  toggle,
  fetchApi,
  setFormSize,
  api = 'ticket-booking',
  _id,
  stateSelector,
  removeSelection
}) => {
  const dispatch = useDispatch();
  let editId = useSelector((state) =>
    state[stateSelector]?.data?.find((item) => item._id === _id)
  );

  // states
  const [files, setFiles] = useState([])
  const [previousFiles, setPreviousFiles] = useState([])
  const [removeFiles, setRemoveFiles] = useState([])
  // onModel
  const clients = useSelector((state) => state.client?.data);
  const company = useSelector((state) => state.company?.data);
  const agents = useSelector((state) => state.agent?.data);

  useEffect(() => {
    setFormSize(400);
    dispatch(fetchAgent({ limit: 100 }));
    dispatch(fetchClient({ limit: 100 }));
    dispatch(fetchCompany({ limit: 100 }));
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
      setPreviousFiles(editId.files)
      setValue('invoiceDate', dayjs(editId.invoiceDate))
      setValue('by', editId.by._id)
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
        api:"ticket-booking",
        data: formData,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    } else {
      createApi({
        api:"ticket-booking",
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
      name: 'invoiceNumber',
      placeholder: `Enter Invoice Number`,
      label: `Invoice Number`,
      type: 'number'
    },
    {
      name: 'ticketNumber',
      placeholder: `Enter Ticket Number`,
      label: `Ticket Number`,
      type: 'number'
    },
    {
      name: 'customer',
      placeholder: `Customer Name`,
      label: `Customer Name`
    },
    {
      name: 'sector',
      placeholder: `Sector`
    },
    {
      name: 'airline',
      placeholder: `Airline`,
    },
    {
      name: 'ticketCost',
      placeholder: `Ticket Cost`,
      type: 'number'
    },
    {
      name: 'sellingPrice',
      placeholder: `Selling Cost`,
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
      name: 'paymentMethod',
      placeholder: `Payment Method`
    }
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ pb: 2 }}>
          <DatePickerHookField
            name='invoiceDate'
            placeholder='Invoice Date'
            required={true}
            control={control}
            errors={errors}
          />
        </Box>
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
           {!editId ? (
              <Box sx={{ width: '200px' }}>
                <Controller
                  name='files'
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <label htmlFor='files'>Upload Files</label>
                      <FilesUploader
                        setFiles={setFiles}
                        files={files}
                        onChange={onChange}
                      />
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

export default TicketBookingForm;
