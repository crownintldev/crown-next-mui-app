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
import { fetchAgent, fetchClient, fetchCompany, fetchVisaBooking } from 'src/store';

// action
import { createApi, updateApi } from 'src/action/function';

//dataEntry
import SingleFileUploader from 'src/common/fileUpload/SingleFileUploader';
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField';
import SelectHookField from 'src/common/dataEntry/SelectHookField';

const schema = yup.object().shape({});

const defaultValues = {
  file: '',
  status: 'pending',
  onModel: 'Agent',
  by: ''
};

const statusList = [
  'pending',
  'booked',
  'inprocess',
  'verification',
  'in Embassy',
  'approved',
  'returned',
  'cancelled',
  'delivered',
  'rejected',
  'trash'
];

const PassportUploadFile = ({
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
  const [byItems, setByItems] = useState([]);
  // onModel
  const clients = useSelector((state) => state.client?.data);
  const company = useSelector((state) => state.company?.data);
  const agents = useSelector((state) => state.agent?.data);
  useEffect(() => {
    setValue('file', file);
  }, [file]);
  useEffect(() => {
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
  const watchedOnModel = watch('onModel');

  useEffect(() => {
    let newByItems = [];
    if (watchedOnModel === 'Client') {
      newByItems = clients;
    } else if (watchedOnModel === 'Agent') {
      newByItems = agents;
    } else if (watchedOnModel === 'Company') {
      newByItems = company;
    }
    setByItems(newByItems); // Update state
  }, [watchedOnModel, clients, agents, company]); // Depend on watchedOnModel and data sources

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

  const byItem = byItems.map((item) => ({
    name: `${item.fullName || item.companyName} ${item.phone}`,
    _id: item._id
  }));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SingleFileUploader file={file} setFile={setFile} />
        <SimpleSelectHookField
          control={control}
          errors={errors}
          name={'status'}
          options={statusList}
          label={'Status'}
          placeholder='Select a Status'
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

export default PassportUploadFile;
