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
  fetchSupplier,
  fetchHotelBookingCategory,
  fetchHotelBookingDestination,
  fetchHotelBookingRoomType
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
import IdNameForm from '../idnameForm/IdNameForm';
import SupplierForm from '../supplier/SupplierForm';
const schema = yup.object().shape({
  hotelName: yup.string().required('Hotel is required')
});

const defaultValues = {
  hotelName: '',
  remarks: '',
  by: '',
  onModel: '',
  hotelCost: null,
  sellingPrice: null,
  profit: null,
  discount: null,
  total: null,
  supplier: '',
  noOfDays: null,
  noOfNights: null,
  noOfBeds: null,
  roomType: '',
  category: '',
  destination: '',
  hotelArea: '',
  paymentMethod: '',
  files: [],
  deletedFiles: []
};

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
  const [files, setFiles] = useState([]);
  const [previousFiles, setPreviousFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);
  //redux selectors
  // for onModel
  const clients = useSelector((state) => state.client?.data);
  const company = useSelector((state) => state.company?.data);
  const agents = useSelector((state) => state.agent?.data);
  //
  const paymentMethod = useSelector((state) => state?.paymentMethod?.data);
  const hotelBookingCategory = useSelector((state) => state?.hotelBookingCategory?.data);
  const hotelBookingDestination = useSelector(
    (state) => state?.hotelBookingDestination?.data
  );
  const hotelBookingRoomType = useSelector((state) => state?.hotelBookingRoomType?.data);
  const supplier = useSelector((state) => state?.supplier?.data);

  useEffect(() => {
    setFormSize(400);
    dispatch(fetchAgent({ limit: 1000 }));
    dispatch(fetchClient({ limit: 1000 }));
    dispatch(fetchCompany({ limit: 1000 }));
    dispatch(fetchSupplier({ limit: 1000 }));
    dispatch(fetchPaymentMethod({ limit: 1000 }));
    dispatch(fetchHotelBookingCategory({ limit: 1000 }));
    dispatch(fetchHotelBookingDestination({ limit: 1000 }));
    dispatch(fetchHotelBookingRoomType({ limit: 1000 }));
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
      setValue('paymentMethod', editId.paymentMethod._id);
      setPreviousFiles(editId.files);
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
        api: 'hotel-booking',
        data: formData,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    } else {
      createApi({
        api: 'hotel-booking',
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
      name: 'noOfDays',
      placeholder: `Enter noOfDays`,
      label: `Number Of Days`,
      type: 'number'
    },
    {
      name: 'noOfNights',
      placeholder: `Enter noOfNights`,
      label: `Number Of Night`,
      type: 'number'
    },
    {
      name: 'noOfBeds',
      placeholder: `Enter noOfBeds`,
      label: `Number Of Beds`,
      type: 'number'
    },

    {
      name: 'hotelArea',
      placeholder: `Enter hotelArea`,
      label: `Hotel Area`
    },
   
  
  ];
  const pricingFields=[
    {
      name: 'hotelCost',
      placeholder: `Enter Hotel Cost`,
      label: `Hotel Cost`,
      type: 'number'
    },
    {
      name: 'sellingPrice',
      placeholder: `Enter Selling Price`,
      label: `Sellling Price`,
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
  ]
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
      <form>
        <CustomHookTextField
          chooseFields={chooseFields}
          control={control}
          errors={errors}
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
          ButtonTitle='Add Hotel Category'
          drawerTitle='Add Hotel Category'
          Form={IdNameForm}
          fetchApi={fetchHotelBookingCategory}
          formName='Hotel Category'
          api='hotel-booking-category'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='category'
          options={hotelBookingCategory ?? []}
          showValue='name'
          label='Category'
          placeholder='Choose Hotel Category'
        />
        <CustomOpenDrawer
          ButtonTitle='Add Hotel Destination'
          drawerTitle='Add Hotel Destination'
          Form={IdNameForm}
          fetchApi={fetchHotelBookingDestination}
          formName='Hotel Destination'
          api='hotel-booking-destination'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='destination'
          options={hotelBookingDestination ?? []}
          showValue='name'
          label='Destination'
          placeholder='Choose Hotel Destination'
        />
        <CustomOpenDrawer
          ButtonTitle='Add Hotel Room Type'
          drawerTitle='Add Hotel Room Type'
          Form={IdNameForm}
          fetchApi={fetchHotelBookingRoomType}
          formName='Hotel Room Type'
          api='hotel-booking-room-type'
        />
        <SelectHookField
          control={control}
          errors={errors}
          name='roomType'
          options={hotelBookingRoomType ?? []}
          showValue='name'
          label='Room Type'
          placeholder='Choose Hotel Room Type'
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
        <CustomHookTextField
          chooseFields={remarksField}
          control={control}
          errors={errors}
        />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type='submit'
            variant='contained'
            sx={{ mr: 3 }}
            onClick={handleSubmit(onSubmit)}
          >
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
