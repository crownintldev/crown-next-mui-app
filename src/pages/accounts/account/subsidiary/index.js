import React, { useState,useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'src/common/materialTable/MaterialTable';
import useSubsidiaryColumns from 'src/common/materialTable/tableColumns/subsidiaryColumns';
import NewMenuCsvUploader from 'src/common/materialTable/tableHeader/newHeaderMenu/NewMenu-CsvUploader';
//Forms
import SubsidiaryForm from 'src/common/forms/subsidiary/subsidiaryForm';
// redux
import { fetchSubsidiary } from 'src/store';
import HeaderMenuDrawer from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenuDrawer';

const index = ({ apiData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const [Form, SetForm] = useState({
    Form: null,
    title: ''
  });
  const columns = useSubsidiaryColumns();
  const formDrawer = () =>
    HeaderMenuDrawer({
      drawerOpen,
      toggleDrawer,
      Form: Form.Form,
      fetchData: fetchSubsidiary,
      FormTitle: Form.title,
      api: 'subsidiary'
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
        api={'subsidiary'}
        NewHeaderMenu={newHeaderMenu}
        apiData={apiData}
        fetchData={fetchSubsidiary}
        stateSelector='subsidiary'
        columns={columns}
        drawerProps={{
          formTitle: 'Create Subsidiary',
          editFormTitle: 'Edit Subsidiary',

          //header buttons drawer
          buttonTitle: 'Subsidiary',
          editButtonTitle: 'Edit Subsidiary',
          CreateForm: SubsidiaryForm,
          EditForm: SubsidiaryForm
        }}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get('/cards/statistics');
  const apiData = res.data;

  return {
    props: {
      apiData
    }
  };
};

export default index;
