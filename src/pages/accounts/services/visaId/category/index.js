import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useNameIdTableColumns from 'src/common/materialTable/tableColumns/nameId'

//Forms
import VisaServiceIdForm from 'src/common/forms/visaServiceIdForm/visaServiceIdForm'

// redux
// import { fetchData } from 'src/store/apps/services/id/visaCategory'
import { fetchVisaCategory } from 'src/store'

const index = ({ apiData }) => {
  const columns = useNameIdTableColumns('Category')

  return (
    <div>
      <MaterialTable
        api={'visa-category'}
        apiData={apiData}
        fetchData={fetchVisaCategory}
        stateSelector='visaCategory'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Visa Category',
          editFormTitle: 'Edit Visa Category',

          //header buttons drawer
          buttonTitle: 'Add Visa Category',
          editButtonTitle: 'Edit Visa Category',
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
