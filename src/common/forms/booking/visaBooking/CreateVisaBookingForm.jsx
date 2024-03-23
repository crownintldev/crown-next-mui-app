import React, { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';

// ** MUI Imports
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { Box, Radio, Grid, Typography } from '@mui/material';

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field';

import { useDispatch, useSelector } from 'react-redux';

// ** Actions Imports
import { fetchSupplier, fetchVisaBooking } from 'src/store';

import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { SelectChangeEvent } from '@mui/material/Select';
import FormDrawer from 'src/common/drawer/FormDrawer';
import VisaServiceForm from '../../services/visaService/VisaServiceForm';
import { capitalizeValue } from 'src/utils/helperfunction';

import { fetchVisaService } from 'src/store';

//get by data
import axiosInstance from 'src/utils/axiosInstance';
import { listVisaCategory } from 'src/action/visaIdSelector/visaCategory';
import { listVisaDestination } from 'src/action/visaIdSelector/visaDestination';
import { listVisaDuration } from 'src/action/visaIdSelector/visaDuration';
import { listVisaType } from 'src/action/visaIdSelector/visaType';
import { findVisaId } from 'src/action/visaService';

// ** Third Party Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// action function common
import toast from 'react-hot-toast';
import { fetchActionData } from 'src/action/fetchData';
import { axiosErrorMessage } from 'src/utils/helperfunction';
import {
  fetchVisaCategory,
  fetchVisaDestination,
  fetchVisaDuration,
  fetchVisaType
} from 'src/store';

const schema = yup.object().shape({
  // visaBookingIds: yup.array().of(yup.string()).required('Visa booking IDs are required.'),
  status: yup.string().required('Status is required.'),
  total: yup.number().typeError('Increment must be a number'),
  increment: yup.number().typeError('Increment must be a number'),
  discount: yup.number().typeError('Discount must be a number')
});

//custom vuexy select style
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

// reuse function
import { removeUndefined } from 'src/utils/helperfunction';
import SimpleSelectHookField from 'src/common/dataEntry/SimpleSelectHookField';
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField';
import { createApi, createManyApi, updateManyApi } from 'src/action/function';
import SelectHookField from 'src/common/dataEntry/SelectHookField';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const defaultValues = {
  passportId: '',
  passportNumber: '',
  visaId: '',
  confirmed: '',
  processing: '',
  increment: 0,
  discount: 0,
  status: 'booked'
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

// ------------------visaBooking Form-----------------------
const CreateVisaBookingForm = ({ toggle, _id, removeSelection, setFormSize }) => {
  //   console.log(_id);
  useEffect(() => {
    setFormSize(400);
  }, []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  // ** State
  const [selectedValue, setSelectedValue] = useState('');
  const [visa, setVisa] = useState('');
  const [loading, setLoading] = useState(false);

  //dispatch
  const dispatch = useDispatch();

  const visaBookingItem = useSelector(
    (state) => _id && state?.visaBooking?.data.find((item) => item?._id === _id)
  );

  // use selector of visa-ids
  const destination = useSelector((state) => state.visaDestination.data);
  const category = useSelector((state) => state.visaCategory.data);
  const duration = useSelector((state) => state.visaDuration.data);
  const type = useSelector((state) => state.visaType.data);
  const supplier = useSelector((state) => state.supplier.data);

  const [findVisa, setFindVisa] = useState({
    destination: '',
    category: '',
    type: '',
    duration: '',
    supplier: ''
  });
  useEffect(() => {
    dispatch(fetchVisaCategory({ limit: 1000 }));
    dispatch(fetchVisaDestination({ limit: 1000 }));
    dispatch(fetchVisaDuration({ limit: 1000 }));
    dispatch(fetchVisaType({ limit: 1000 }));
    dispatch(fetchSupplier({ limit: 1000 }));
  }, []);
  let supplierId = '';
  useEffect(() => {
    const { destination, category, duration, type, supplier } = findVisa;
    if (destination && category && type && duration && supplier) {
      const getVisa = async () => {
        try {
          setLoading(true);
          const res = await findVisaId({
            destination,
            category,
            type,
            duration,
            supplier
          });
          setVisa(res.data.data);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      };
      getVisa();
    }
  }, [findVisa]);
  // console.log(visaBookingItems)
  const {
    reset,
    control,
    setError,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  supplierId = watch('supplier');
  //************************ edit ids ****************************
  useEffect(() => {
    setValue('visaBookingId', _id);
    setValue('passportId', visaBookingItem.passport.passportId);
    setValue('passportNumber', visaBookingItem.passport.passportNumber);
    if (_id) {
      setValue('status', visaBookingItem?.status);
      setValue('total', visaBookingItem?.total);
      setValue('increment', visaBookingItem?.increment);
      setValue('discount', visaBookingItem?.discount);
      if (visaBookingItem?.visa) {
        let { destination, duration, category, type,supplier } = visaBookingItem.visa;
        setFindVisa({
          destination: destination?._id,
          duration: duration?._id,
          category: category?._id,
          type: type?._id,
          supplier:supplier
        });
        if (visaBookingItem?.processing) {
          setValue('confirmed', undefined);
          setValue('paymentType', 'processing');
        } else if (visaBookingItem?.confirmed) {
          setValue('processing', undefined);
          setValue('paymentType', 'confirmed');
        }
        setValue('visaId', visa._id);
      }
    } else if (ids.length > 1) {
      setValue('status', 'booked');
      if (visa && visa.length === 0) {
        setValue('visaId', '');
      }
      // if (visa._id) {
      // }
    }
  }, [_id]);
  //******************* Payment Handle ************************************
  const paymentType = watch('paymentType');
  let increment = watch('increment');
  let discount = watch('discount');
  useEffect(() => {
    setValue('visaId', visa?._id);
    if (paymentType === 'confirmed') {
      setValue('confirmed', visa?.confirmed);
      let { totalFee } = visa?.confirmed || {};
      let total =
        (totalFee ?? 0) +
        (increment ? Number(increment) : 0) -
        (discount ? Number(discount) : 0);
      setValue('total', total);
      setValue('processing', undefined);
    }
    if (paymentType === 'processing') {
      setValue('processing', visa?.processing);
      let { processingFee, visaFee } = visa?.processing || {};
      let total =
        (processingFee ?? 0) +
        (visaFee ?? 0) +
        (increment ? Number(increment) : 0) -
        (discount ? Number(discount) : 0);
      // console.log(increment)
      setValue('total', total);
      setValue('confirmed', undefined);
    }
  }, [visa, paymentType, increment, discount, setValue]);

  const handleClose = () => {
    if (removeSelection) {
      removeSelection();
    }
    setFindVisa({
      destination: '',
      category: '',
      type: '',
      duration: ''
    });
    toggle();
    reset();
  };
  //************************** */ onSubmit For Create and Update ***********************
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = getValues();
    if (!visa._id) {
      return toast.error('add Visa Must', { position: 'top-center' });
    }
    removeUndefined(data);
    const optional = () => {
      setFindVisa({
        destination: '',
        category: '',
        type: '',
        duration: ''
      });
    };
    const apiConfig = {
      data,
      dispatch,
      fetchData: fetchVisaBooking,
      toggle,
      reset,
      removeSelection,
      optional
    };
    const userConfirmed = window.confirm(
      'Are you sure you want to Add New Visa With Same Passport?'
    );
    if (userConfirmed) {
      await createApi({ api: 'visa-booking', ...apiConfig });
    }
  };

  // ************Input Field****
  const passportField = [
    {
      name: 'passportNumber',
      label: 'Passport Number',
      disabled: true
    }
  ];

  const amountHandleFields = [
    {
      name: 'increment',
      type: 'number',
      placeholder: '0',
      label: 'Increment *optional'
    },
    {
      name: 'discount',
      type: 'number',
      placeholder: '0',
      label: 'Discount *optional'
    },
    {
      name: 'total',
      type: 'number',
      placeholder: '0',
      label: 'Total Amount',
      disabled: true
    }
  ];

  //************** */ Select Visa Fee*************8
  const selectVisaId = () => {
    if (!visa) {
      return (
        <Box sx={{ pb: 4 }}>
          <Typography variant='p' color='error' sx={{ fontSize: '0.7em' }}>
            Not Found Visa Service
          </Typography>
          <br />
          <Button
            variant='contained'
            size='small'
            color='secondary'
            onClick={() => setDrawerOpen(true)}
          >
            Add Visa Service
          </Button>
        </Box>
      );
    }
    return (
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {['confirmed', 'processing'].map(
            (type) =>
              visa[type] && (
                <Grid item key={type}>
                  <Controller
                    name='paymentType'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Box
                        sx={{
                          border: 1,
                          borderColor: 'grey.700',
                          p: 2,
                          height: '7rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Radio
                          checked={value === type}
                          onChange={() => onChange(type)}
                          value={type}
                          name='radio-buttons'
                          inputProps={{ 'aria-label': type }}
                        />
                        <div>
                          <Typography
                            variant='h6'
                            component='h4'
                            sx={{ fontWeight: 'bold', mb: '4px' }}
                          >
                            {type === 'confirmed' ? 'Confirmed Fee' : 'Processing Fee:'}
                          </Typography>
                          <span>
                            &nbsp;
                            {type === 'confirmed'
                              ? `Total Fee: ${visa.confirmed.totalFee}`
                              : `Processing Fee: ${visa.processing.processingFee}`}
                          </span>
                          {type === 'processing' && <br />}
                          {type === 'processing' && (
                            <span>&nbsp;Visa Fee: {visa.processing.visaFee}</span>
                          )}
                        </div>
                      </Box>
                    )}
                  />
                </Grid>
              )
          )}
        </Grid>
      </Box>
    );
  };

  return (
    <div>
      <FormDrawer
        open={drawerOpen}
        toggle={toggleDrawer}
        drawerTitle={'Add Visa Service'}
        Form={VisaServiceForm}
        anchor='left'
        fetchApi={fetchVisaService}
      />
      <form>
        <CustomHookTextField
          chooseFields={passportField}
          control={control}
          errors={errors}
          required={true}
        />
        <SimpleSelectHookField
          control={control}
          errors={errors}
          name={'status'}
          options={statusList}
          label={'Status'}
          placeholder='Select a Status'
        />

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Destination'
          SelectProps={{
            value: findVisa.destination ?? '',
            displayEmpty: true,
            onChange: (e) => setFindVisa({ ...findVisa, destination: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a destination
          </MenuItem>
          {destination?.length > 0 &&
            destination.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name.toUpperCase()}
              </MenuItem>
            ))}
        </CustomTextField>

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Category'
          SelectProps={{
            value: findVisa.category ?? '',
            displayEmpty: true,
            onChange: (e) => setFindVisa({ ...findVisa, category: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a category
          </MenuItem>
          {category?.length > 0 &&
            category.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name.toUpperCase()}
              </MenuItem>
            ))}
        </CustomTextField>

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Type'
          SelectProps={{
            value: findVisa.type ?? '',
            displayEmpty: true,
            onChange: (e) => setFindVisa({ ...findVisa, type: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a type
          </MenuItem>
          {type?.length > 0 &&
            type.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name.toUpperCase()}
              </MenuItem>
            ))}
        </CustomTextField>

        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Duration'
          SelectProps={{
            value: findVisa.duration ?? '',
            displayEmpty: true,
            onChange: (e) => setFindVisa({ ...findVisa, duration: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select a duration
          </MenuItem>
          {duration?.length > 0 &&
            duration.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name.toUpperCase()}
              </MenuItem>
            ))}
        </CustomTextField>
        <CustomTextField
          select
          fullWidth
          sx={{ mb: 6 }}
          label='Supplier'
          SelectProps={{
            value: findVisa.supplier ?? '',
            displayEmpty: true,
            onChange: (e) => setFindVisa({ ...findVisa, supplier: e.target.value })
          }}
        >
          <MenuItem value='' disabled>
            Select Supplier
          </MenuItem>
          {supplier?.length > 0 &&
            supplier.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item?.name.toUpperCase()}
              </MenuItem>
            ))}
        </CustomTextField>
        {loading ? 'loading ...' : selectVisaId()}
        <CustomHookTextField
          chooseFields={amountHandleFields}
          control={control}
          errors={errors}
          required={true}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            sx={{ mr: 3 }}
            type='submit'
            onClick={handleOnSubmit}
          >
            Submit
          </Button>

          <Button variant='tonal' color='secondary' onClick={handleClose} sx={{ mr: 3 }}>
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateVisaBookingForm;
