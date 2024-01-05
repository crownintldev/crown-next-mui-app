import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useNameIdTableColumns from 'src/common/materialTable/tableColumns/nameId'
//Forms
import VisaServiceIdForm from 'src/common/forms/visaServiceIdForm/visaServiceIdForm'
// redux
import { fetchVisaDuration } from 'src/store'

const index = ({ apiData }) => {
  const columns = useNameIdTableColumns('Duration')
  return (
    <div>
      <MaterialTable
        api={'visa-duration'}
        apiData={apiData}
        fetchData={fetchVisaDuration}
        stateSelector='visaDuration'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Visa Duration',
          editFormTitle: 'Edit Visa Duration',
          //header buttons drawer
          buttonTitle: 'Add Visa Duration',
          editButtonTitle: 'Edit Visa Duration',
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
