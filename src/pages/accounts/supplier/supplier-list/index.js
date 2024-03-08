import React, { useState,useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'src/common/materialTable/MaterialTable';
import useSupplierColumns from 'src/common/materialTable/tableColumns/supplierColumns';
import UploadFileSupplier from 'src/common/forms/uploadFile/UploadFileSupplier';

//Forms
import SupplierForm from 'src/common/forms/supplier/SupplierForm';

// redux
import { fetchSupplier } from 'src/store';
import HeaderMenuDrawer from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenuDrawer';
import NewMenuCsvUploader from 'src/common/materialTable/tableHeader/newHeaderMenu/NewMenu-CsvUploader';

const index = ({ apiData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const [Form, SetForm] = useState({
    Form: null,
    title: ''
  });
  const columns = useSupplierColumns();
  const formDrawer = () =>
    HeaderMenuDrawer({
      drawerOpen,
      toggleDrawer,
      Form: Form.Form,
      fetchData: fetchSupplier,
      FormTitle: Form.title,
      api: 'supplier'
    });
  const newHeaderMenu = ({ selectedIds, toggle, removeSelection }) => {
    return NewMenuCsvUploader({
      UploadForm: UploadFileSupplier,
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
        api={'supplier'}
        apiData={apiData}
        fetchData={fetchSupplier}
        NewHeaderMenu={newHeaderMenu}
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
