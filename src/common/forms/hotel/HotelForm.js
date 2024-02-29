import React from 'react'

// ** Third Party Imports
import * as yup from 'yup'

import CommonForm1 from '../commonForms/CommonForm1'

const schema = yup.object().shape({
  hotelName: yup.string().required('Hotel is required'),
  remarks: yup.string().required('Remarks is required'),
  referenceMember: yup.string().required("Reference Member is required"),
  hotelCost: yup.number().required("Hotel Cost is required"),
  sellingCost: yup.number().required("sellingCost is required"),
  profit: yup.number().required("profit is required"),
  discount: yup.number().required("discount is required"),
  total: yup.number().required("total is required"),
  destination: yup.number().required("destination is required"),
  noOfDays: yup.number().required("noOfDays is required"),
  noOfNights: yup.number().required("noOfNights is required"),
  noOfBeds: yup.number().required("noOfBeds is required"),
  roomType: yup.number().required("roomType is required"),
  hotelCategory: yup.number().required("roomType is required"),
  hotelArea: yup.number().required("hotelArea is required"),
  files: yup.array().required('Files Are Missing')
})

const defaultValues = {
  hotelName: '',
  remarks: '',
  referenceMember: '',
  hotelCost: '',
  sellingCost: '',
  profit: '',
  discount: '',
  total: '',
  destination: '',
  noOfDays: '',
  noOfNights: '',
  noOfBeds: '',
  roomType: '',
  hotelCategory: '',
  hotelArea: '',
  files: [],
  deletedFiles: [],
}

const HotelBookingForm = ({
  toggle,
  fetchApi,
  api = 'businesssetting',
  _id,
  stateSelector,
  removeSelection
}) => {
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
      name: 'referenceMember',
      placeholder: `Enter Reference Member`,
      label: `Reference Member`
    },
    {
        name: "hotelCost",
        placeholder: `Enter Hotel Cost`,
      label: `Hotel Cost`
    },
    {
      name: 'sellingCost',
      placeholder: `Enter Selling Cost`,
      label: `sellingCost`
    }
    ,
    {
      name: 'profit',
      placeholder: `Enter Profit`,
      label: `Profit`
    }
    ,
    {
      name: 'discount',
      placeholder: `Enter discount`,
      label: `Discount`
    }
    ,
    {
      name: 'total',
      placeholder: `Enter total`,
      label: `Total`
    }
    ,
    {
      name: 'destination',
      placeholder: `Enter destination`,
      label: `Destination`
    }
    ,
    {
      name: 'noOfDays',
      placeholder: `Enter noOfDays`,
      label: `Number Of Days`
    }
    ,
    {
      name: 'noOfNights',
      placeholder: `Enter noOfNights`,
      label: `Number Of Night`
    }
    ,
    {
      name: 'noOfBeds',
      placeholder: `Enter noOfBeds`,
      label: `Number Of Beds`
    }
    ,
    {
        name: 'roomType',
        placeholder: `Enter roomType`,
        label: `Room Type`
      },
      {
        name: 'hotelCategory',
        placeholder: `Enter hotelCategory`,
        label: `Hotel Category`
      }
      ,
      {
        name: 'hotelArea',
        placeholder: `Enter hotelArea`,
        label: `Hotel Area`
      }
    ]

  return (
    <div>
      <CommonForm1
        toggle={toggle}
        fetchApi={fetchApi}
        api={api}
        _id={_id}
        stateSelector={stateSelector}
        removeSelection={removeSelection}
        schema={schema}
        defaultValues={defaultValues}
        chooseFields={chooseFields}
      />
    </div>
  )
}

export default HotelBookingForm
