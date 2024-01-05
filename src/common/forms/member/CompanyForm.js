import React from 'react'

import CommonForm1 from '../commonForms/CommonForm1'
// ** Third Party Imports
import * as yup from 'yup'

const schema = yup.object().shape({
  companyName: yup.string().required('Required'),
  phone: yup.number().required('Required'),
  phone: yup.number().required('Required'),
  cnic: yup.string().required('Required'),
  ownerContact: yup.string().required('Required'),
  address: yup.string().required('Required')
})

const defaultValues = {
  companyName: '',
  phone: '',
  licenseNo: '',
  ownerContact: '',
  cnic: '',
  address: ''
}

const chooseFields = [
  {
    name: 'companyName',
    placeholder: `Enter Company Name`,
    label: `Company Name`
  },
  {
    name: 'phone',
    placeholder: `Enter Phone Number`,
    label: `Phone`,
    type: 'number'
  },
  {
    name: 'licenseNo',
    placeholder: `Enter license #`,
    label: `license #`
  },
  {
    name: 'ownerContact',
    placeholder: `Enter Owner Contact Number`,
    label: `Owner Contact Number`,
    type: 'number'
  },
  {
    name: 'cnic',
    placeholder: `Enter Cnic Number`,
    label: `Cnic Number`
  },
  {
    name: 'address',
    placeholder: `Enter Address`,
    label: `Address`
  }
]

const CompanyForm = ({ toggle, fetchApi, api = 'agent', _id, stateSelector, removeSelection }) => {
  return (
    <>
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
    </>
  )
}

export default CompanyForm
