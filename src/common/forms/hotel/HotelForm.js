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
import EditFilesUploader from 'src/common/fileUpload/EditFileUploader';
import FilesUploader from 'src/common/fileUpload/FilesUploader';
import dayjs from 'dayjs';
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField';
import SelectHookField from 'src/common/dataEntry/SelectHookField';
const schema = yup.object().shape({
  hotelName: yup.string().required('Hotel is required'),
  // remarks: yup.string().required('Remarks is required'),
  // referenceMember: yup.string().required("Reference Member is required"),
  // hotelCost: yup.number().required("Hotel Cost is required"),
  // sellingCost: yup.number().required("sellingCost is required"),
  // supplier: yup.string(),
  // profit: yup.number().required("profit is required"),
  // discount: yup.number().required("discount is required"),
  // total: yup.number().required("total is required"),
  // destination: yup.string().required("destination is required"),
  // noOfDays: yup.number().required("noOfDays is required"),
  // noOfNights: yup.number().required("noOfNights is required"),
  // noOfBeds: yup.number().required("noOfBeds is required"),
  // roomType: yup.string().required("roomType is required"),
  // hotelCategory: yup.string().required("hotelCategory is required"),
  // hotelArea: yup.string().required("hotelArea is required"),
  // paymentMethod: yup.string().required("paymentMethod is required"),
  // files: yup.array().required('Files Are Missing')
})

const defaultValues = {
  hotelName: '',
  remarks: '',
  by: '',
  onModel: '',
  hotelCost: '',
  sellingPrice: '',
  profit: '',
  discount: '',
  total: '',
  supplier: '',
  destination: '',
  noOfDays: '',
  noOfNights: '',
  noOfBeds: '',
  roomType: '',
  hotelCategory: '',
  hotelArea: '',
  paymentMethod: '',
  files: [],
  deletedFiles: [],
}

const HotelBookingForm = ({
  toggle,
  fetchApi,
  setFormSize,
  api = 'hotel-booking',
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
    } else {
      reset();
    }
  }, [setValue, editId]);

  const hotelCost = watch('hotelCost');
  let sellingPrice = watch('sellingPrice');
  let discount = watch('discount');

  useEffect(() => {
    let profit = sellingPrice - hotelCost;
    let total = profit - discount;
    setValue('total', total);
    setValue('profit', profit);
  }, [sellingPrice, hotelCost, discount]);

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

    console.log('sbmt')
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
        api:"hotel-booking",
        data: formData,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    } else {
      createApi({
        api:"hotel-booking",
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
        name: 'hotelName',
      placeholder: `Enter Hotel Name`,
      label: `Hotel Name`,
      required: true
    },
    {
        name: 'remarks',
      placeholder: `Enter remarks`,
      label: `Remarks`,
      required: true
    },
    {
        name: 'supplier',
        placeholder: `Enter supplier`,
        label: `Supplier`,
        required: true
    },
    {
        name: "hotelCost",
        placeholder: `Enter Hotel Cost`,
      label: `Hotel Cost`
    },
    {
      name: 'sellingPrice',
      placeholder: `Enter Selling Price`,
      label: `Sellling Price`
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
      name: 'destination',
      placeholder: `Enter destination`,
      label: `Destination`
    },
    {
      name: 'noOfDays',
      placeholder: `Enter noOfDays`,
      label: `Number Of Days`
    },
    {
      name: 'noOfNights',
      placeholder: `Enter noOfNights`,
      label: `Number Of Night`
    },
    {
      name: 'noOfBeds',
      placeholder: `Enter noOfBeds`,
      label: `Number Of Beds`
    },
    {
        name: 'roomType',
        placeholder: `Enter roomType`,
        label: `Room Type`
      },
      {
        name: 'hotelCategory',
        placeholder: `Enter hotelCategory`,
        label: `Hotel Category`
      },
      {
        name: 'hotelArea',
        placeholder: `Enter hotelArea`,
        label: `Hotel Area`
      },
      {
        name: 'paymentMethod',
        placeholder: 'Enter Payment Method',
        label: "Payment Method"
      }
    ]

  return (
    <div>
      <form >
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
          <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
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

export default HotelBookingForm;
