import React, { useState } from 'react';
import axios from 'axios';
import GroupTable from 'src/common/materialTable/groupTable/GroupTable';
import {
  useTableColumns,
  useChildTableColumns
} from 'src/common/materialTable/tableColumns/accountColumns';

//Forms
import EditAccountForm from 'src/common/forms/account/EditAccountForm';

// redux
import { fetchData } from 'src/store/apps/account';
import MediaDrawer from 'src/common/drawer/MediaDrawer';
import HeaderMenuAccount from 'src/common/materialTable/groupTable/tableHeader/headerMenu/HeaderMenuAccount';
import HeaderMenuDrawer from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenuDrawer';
//
const index = ({ apiData }) => {
  // **states
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [mediaDrawerOpen, setMediaDrawerOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const [selectedIds, setSelectedIds] = useState();
  const [removeSelection, setRemoveSelection] = useState({});
  const [Form, SetForm] = useState({
    Form: null
  });

  
  // console.log('clg', selectedRowData)
  // open media drawer handler
  const openMediaDrawer = (row) => {
    setSelectedRowData(row.original);
    setMediaDrawerOpen(true);
  };

  const formDrawer = () =>
    HeaderMenuDrawer({
      selectedIds,
      drawerOpen,
      toggleDrawer,
      Form: Form.Form,
      FormTitle: Form.title,
      removeSelection: removeSelection.removeSelection
    });

  const headerMenu = ({ selectedIds, handleClose, removeSelection }) => {
    return HeaderMenuAccount({
      setSelectedIds,
      setRemoveSelection,
      SetForm,
      toggleDrawer,
      selectedIds,
      handleClose,
      removeSelection
    });
  };

  const columns = useTableColumns(openMediaDrawer);
  const childColumns = useChildTableColumns();

  return (
    <div>
      {formDrawer()}
      <GroupTable
        api={'accounts'}
        //  apiData={apiData}
        // headerMenu={headerMenu}
        columns={columns}
        childColumns={childColumns}
        fetchData={fetchData}
        stateSelector='account'
        tab1='/accounts/account/visa-account'
        tab2='/accounts/account/visa-account-log'
        drawerProps={{
          editFormTitle: 'Edit Account',
          //header buttons drawer
          editButtonTitle: 'Edit Account',
          // forms
          EditForm: EditAccountForm,
          multiSelected: true
        }}
      />
      {mediaDrawerOpen && (
        <MediaDrawer
          open={mediaDrawerOpen}
          onClose={() => setMediaDrawerOpen(false)}
          data={selectedRowData}
        />
      )}
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
