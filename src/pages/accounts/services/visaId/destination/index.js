import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useNameIdTableColumns from 'src/common/materialTable/tableColumns/nameId'
//Forms
import VisaServiceIdForm from 'src/common/forms/visaServiceIdForm/visaServiceIdForm'
// redux
import { fetchVisaDestination } from 'src/store'

const index = ({ apiData }) => {
  const columns = useNameIdTableColumns('Destination')
  return (
    <div>
      <MaterialTable
        api={'visa-destination'}
        apiData={apiData}
        fetchData={fetchVisaDestination}
        stateSelector='visaDestination'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Visa Destination',
          editFormTitle: 'Edit Visa Destination',
          //header buttons drawer
          buttonTitle: 'Add Visa Destination',
          editButtonTitle: 'Edit Visa Destination',
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
