import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useNameIdTableColumns from 'src/common/materialTable/tableColumns/nameId'

//Forms
import IdNameForm from 'src/common/forms/idnameForm/IdNameForm'

// redux
import { fetchSupplierCategory } from 'src/store'

const index = ({ apiData }) => {
  const columns = useNameIdTableColumns('Category')

  return (
    <div>
      <MaterialTable
        api={'supplier-category'}
        apiData={apiData}
        fetchData={fetchSupplierCategory}
        stateSelector='supplierCategory'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Supplier Category',
          editFormTitle: 'Edit Supplier Category',

          //header buttons drawer
          buttonTitle: 'Add Supplier Category',
          editButtonTitle: 'Edit Supplier Category',
          CreateForm: IdNameForm,
          EditForm: IdNameForm
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
