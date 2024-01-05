import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useSupplierVisaService from 'src/common/materialTable/tableColumns/supplierVisaService'
//Forms
import SupplierVisaForm from 'src/common/forms/supplier-visa-service/SupplierVisaForm'
// redux
import { fetchSupplierVisaService } from 'src/store'

const index = ({ apiData }) => {
  const columns = useSupplierVisaService()
  return (
    <div>
      <MaterialTable
        api={'supplier-visa-service'}
        apiData={apiData}
        fetchData={fetchSupplierVisaService}
        stateSelector='supplierVisaService'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Supplier Visa Service',
          editFormTitle: 'Edit Supplier Visa Service',
          //header buttons drawer
          buttonTitle: 'Add Supplier Visa Service',
          editButtonTitle: 'Edit Supplier Visa Service',
          CreateForm: SupplierVisaForm,
          EditForm: SupplierVisaForm
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
