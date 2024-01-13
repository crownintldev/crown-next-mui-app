import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useTableColumns from 'src/common/materialTable/tableColumns/VisaService'

//Forms
import VisaServiceForm from 'src/common/forms/services/visaService/VisaServiceForm'

// redux
import { fetchVisaService } from 'src/store'

const index = ({ apiData }) => {
  const columns = useTableColumns()

  return (
    <div>
      <MaterialTable
        api={'visa-service'}
        apiData={apiData}
        fetchData={fetchVisaService}
        stateSelector='visaService'
        columns={columns}
        drawerProps={{
          formTitle: 'Visa Service Sale Rate',
          editFormTitle: 'Edit Visa Service Sale Rate',

          //header buttons drawer
          buttonTitle: 'Add New Visa Service',
          editButtonTitle: 'Edit Visa Service',
          CreateForm: VisaServiceForm,
          EditForm: VisaServiceForm
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
