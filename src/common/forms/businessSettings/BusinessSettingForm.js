import React from 'react'

// ** Third Party Imports
import * as yup from 'yup'

import CommonForm1 from '../commonForms/CommonForm1'

const schema = yup.object().shape({
  businessName: yup.string().required('required'),
  contact: yup.string().required('required'),
  phone: yup.string().required('required'),
  email: yup.string().required("required"),
  businessAddress: yup.string().required("required"),
  supplier: yup.string().required('required')
})

const defaultValues = {
    businessName: '',
    contact: '',
  phone: '',
  email: '',
  businessAddress: '',
  supplier: '',
}

const BusinessSettingForm = ({
  toggle,
  fetchApi,
  api = 'businesssetting',
  _id,
  stateSelector,
  removeSelection
}) => {
  const chooseFields = [
    {
        name: 'businessName',
      placeholder: `Enter Business Name`,
      label: `Business Name`,
      required: true
    },
    {
        name: 'contact',
      placeholder: `Enter contact Number`,
      label: `contact`,
      required: true
    },
    {
      name: 'phone',
      placeholder: `Enter Phone Number`,
      label: `Phone Number`
    },
    {
        name: "email",
        placeholder: `Enter Email Number`,
      label: `Email`
    },
    {
      name: 'businessAddress',
      placeholder: `Enter Business Address`,
      label: `Business Address`
    }
    ,
    {
      name: 'supplier',
      placeholder: `Select supplier ID`,
      label: `Supplier ID`
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

export default BusinessSettingForm
