import React, { useState,useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useCompanyColumns from 'src/common/materialTable/tableColumns/companyColumns'

//Forms
import CompanyForm from 'src/common/forms/member/CompanyForm'

// redux
import { fetchCompany } from 'src/store'
import NewMenuCsvUploader from 'src/common/materialTable/tableHeader/newHeaderMenu/NewMenu-CsvUploader'
import HeaderMenuDrawer from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenuDrawer'

const index = ({ apiData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const [Form, SetForm] = useState({
    Form: null,
    title: ''
  });
  const columns = useCompanyColumns()
  const formDrawer = () =>
  HeaderMenuDrawer({
    drawerOpen,
    toggleDrawer,
    Form: Form.Form,
    fetchData: fetchCompany,
    FormTitle: Form.title,
    api: 'company'
  });
const newHeaderMenu = ({ selectedIds, toggle, removeSelection }) => {
  return NewMenuCsvUploader({
    SetForm,
    toggleDrawer,
    selectedIds,
    toggle,
    removeSelection
  });
};
  return (
    <div>
      {formDrawer()}
      <MaterialTable
        api={'company'}
        NewHeaderMenu={newHeaderMenu}
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
