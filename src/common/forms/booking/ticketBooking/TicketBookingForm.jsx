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
import IdNameForm from '../../idnameForm/IdNameForm';
import SupplierForm from '../../supplier/SupplierForm';

const schema = yup.object().shape({
  // invoiceDate: yup.string().required('required'),
  // customer: yup.string().required('required')
});

const defaultValues = {
  by: '',
  onModel: 'Agent',
  invoiceNumber: '',
  ticketNumber: '',
  invoiceDate: '',
  customer: '',
  airline: '',
  sellingPrice: 0,
  profit: 0,
  discount: 0,
  paidByCustomer: 0,
  balance: 0,
  sector: '',
  status: '',
  supplier: '',
  paymentMethod: '',
  paymentDescription: '',
  files: []
};

const statusList = ['unpaid', 'partial pay', 'paid'];

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
  const [files, setFiles] = useState([]);
  const [previousFiles, setPreviousFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);
  const [byItems,setByItems] = useState([]);
  //selector redux
  // onModel
  const clients = useSelector((state) => state.client?.data);
  const company = useSelector((state) => state.company?.data);
  const agents = useSelector((state) => state.agent?.data);
  // console.log(agents)
  //
  const supplier = useSelector((state) => state?.supplier?.data);
  // payment Method
  const paymentMethod = useSelector((state) => state?.paymentMethod?.data);
  console.log(paymentMethod)

  useEffect(() => {
    setFormSize(400);
    dispatch(fetchAgent({ limit: 1000 }));
    dispatch(fetchClient({ limit: 1000 }));
    dispatch(fetchCompany({ limit: 1000 }));
    dispatch(fetchSupplier({ limit: 1000 }));
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
      setValue('invoiceDate', dayjs(editId?.invoiceDate));
      setValue('by', editId?.by?._id);
      setValue('paymentMethod', editId?.paymentMethod?._id);
    } else {
      reset();
    }
  }, [setValue, editId]);

  const ticketCost = watch('ticketCost');
  let sellingPrice = watch('sellingPrice');
  let discount = watch('discount');
  let paidByCustomer = watch('paidByCustomer');

  useEffect(() => {
    let profit =
      Number(sellingPrice ?? 0) - Number(ticketCost ?? 0) - Number(discount ?? 0);
    setValue('profit', profit);
    let balance = Number(profit ?? 0) - Number(paidByCustomer ?? 0);
    setValue('balance', balance);
  }, [sellingPrice, ticketCost, discount, paidByCustomer]);

  const handleClose = () => {
    toggle();
    reset();
    removeSelection();
  };

 
  const watchedOnModel = watch('onModel');
  console.log(watchedOnModel);

  useEffect(() => {
    if (watchedOnModel === 'Client') {
      setByItems(clients)
    } else if (watchedOnModel === 'Agent') {
      setByItems(agents)
    } else if (watchedOnModel === 'Company') {
      setByItems(company)
    }
  }, [watchedOnModel]);
  const byItem = byItems.map((item) => ({
    name: `${item.fullName || item.companyName} ${item.phone}`,
    _id: item._id
  }));

  //************************** */ onSubmit
  const onSubmit = async (data) => {
    // console.log(data);
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
        api: 'ticket-booking',
        data: formData,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      });
    } else {
      createApi({
        api: 'ticket-booking',
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
      placeholder: `Airline`
    },
    {
      name: 'ticketCost',
      placeholder: `Ticket Cost`,
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
      placeholder: '(Ticket Cost - selling Price - discount)',
      disabled: true,
      type: 'number'
    },
    {
      name: 'paidByCustomer',
      type: 'number'
    },
    {
      name: 'balance',
      placeholder: '(total - Paid By Customer)',
      disabled: true,
      type: 'number'
    }
  ];
  const paymentDescriptionField = [
    {
      name: 'paymentDescription'
    }
  ];
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ pb: 2 }}></Box>
        <CustomHookTextField
          chooseFields={chooseFields}
          control={control}
          errors={errors}
        />

        <SimpleSelectHookField
          control={control}
          errors={errors}
          name={'status'}
          options={statusList}
          label={'Status'}
          placeholder='Select a Status'
        />

        <CustomHookTextField
          chooseFields={paymentDescriptionField}
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

export default TicketBookingForm;
