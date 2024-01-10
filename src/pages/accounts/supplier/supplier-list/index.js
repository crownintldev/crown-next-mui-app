import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useSupplierColumns from 'src/common/materialTable/tableColumns/supplierColumns'

//Forms
import SupplierForm from 'src/common/forms/supplier/SupplierForm'

// redux
import { fetchSupplier } from 'src/store'

const index = ({ apiData }) => {
  const columns = useSupplierColumns()
  
return (
    <div>
      <MaterialTable
        api={'supplier'}
        apiData={apiData}
        fetchData={fetchSupplier}
        stateSelector='supplier'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Supplier',
          editFormTitle: 'Edit Supplier',

          //header buttons drawer
          buttonTitle: 'Add Supplier',
          editButtonTitle: 'Edit Supplier',
          CreateForm: SupplierForm,
          EditForm: SupplierForm
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
