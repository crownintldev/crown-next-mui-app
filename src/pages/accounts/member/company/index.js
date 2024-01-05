import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useCompanyColumns from 'src/common/materialTable/tableColumns/companyColumns'
//Forms
import CompanyForm from 'src/common/forms/member/CompanyForm'
// redux
import { fetchCompany } from 'src/store'

const index = ({ apiData }) => {
  const columns = useCompanyColumns()
  return (
    <div>
      <MaterialTable
        api={'company'}
        apiData={apiData}
        fetchData={fetchCompany}
        stateSelector='company'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Company',
          editFormTitle: 'Edit Company',
          //header buttons drawer
          buttonTitle: 'Add Company',
          editButtonTitle: 'Edit Company',
          CreateForm: CompanyForm,
          EditForm: CompanyForm
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
