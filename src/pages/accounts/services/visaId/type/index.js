import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useNameIdTableColumns from 'src/common/materialTable/tableColumns/nameId'
//Forms
import VisaServiceIdForm from 'src/common/forms/visaServiceIdForm/visaServiceIdForm'
// redux
import { fetchVisaType } from 'src/store'

const index = ({ apiData }) => {
  const columns = useNameIdTableColumns('Type')
  return (
    <div>
      <MaterialTable
        api={'visa-type'}
        apiData={apiData}
        fetchData={fetchVisaType}
        stateSelector='visaType'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Visa Type',
          editFormTitle: 'Edit Visa Type',
          //header buttons drawer
          buttonTitle: 'Add Visa Type',
          editButtonTitle: 'Edit Visa Type',
          CreateForm: VisaServiceIdForm,
          EditForm: VisaServiceIdForm
        }}
      />
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData = res.data

  return {
    props: {
      apiData
    }
  }
}

export default index
