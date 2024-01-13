import React from 'react'

// ** Third Party Imports
import * as yup from 'yup'

import CommonForm1 from '../commonForms/CommonForm1'

const schema = yup.object().shape({
  fullName: yup.string().required('required'),
  phone: yup.number().required('required'),
  cnic: yup.string().required('required'),
  passportNumber: yup.string().required('required'),
  address: yup.string().required('required')
})

const defaultValues = {
  fullName: '',
  phone: '',
  cnic: '',
  passportNumber: '',
  address: ''
}

const AgentandClientForm = ({
  toggle,
  fetchApi,
  api = 'agent',
  _id,
  stateSelector,
  removeSelection
}) => {
  const chooseFields = [
    {
      name: 'fullName',
      placeholder: `Enter Full Name`,
      label: `Full Name`
    },
    {
      name: 'phone',
      placeholder: `Enter Phone Number`,
      label: `Phone`,
      type: 'number'
    },
    {
      name: 'cnic',
      placeholder: `Enter Cnic Number`,
      label: `Cnic Number`
    },
    {
      name: 'passportNumber',
      placeholder: `Enter Passport Number`,
      label: `Passport Number`
    },
    {
      name: 'address',
      placeholder: `Enter Address`,
      label: `Address`
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

export default AgentandClientForm
