import React, { useState,useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'src/common/materialTable/MaterialTable';
import useAgentAndClientColumns from 'src/common/materialTable/tableColumns/agentAndClient';

//Forms
import AgentandClientForm from 'src/common/forms/member/AgentandClientForm';

// redux
import { fetchClient } from 'src/store';
import HeaderMenuDrawer from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenuDrawer';
import NewMenuCsvUploader from 'src/common/materialTable/tableHeader/newHeaderMenu/NewMenu-CsvUploader';

const index = ({ apiData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const [Form, SetForm] = useState({
    Form: null,
    title: ''
  });
  const columns = useAgentAndClientColumns();
  const formDrawer = () =>
    HeaderMenuDrawer({
      drawerOpen,
      toggleDrawer,
      Form: Form.Form,
      fetchData: fetchClient,
      FormTitle: Form.title,
      api: 'client'
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
        api={'client'}
        apiData={apiData}
        NewHeaderMenu={newHeaderMenu}
        fetchData={fetchClient}
        stateSelector='client'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Client',
          editFormTitle: 'Edit Client',

          //header buttons drawer
          buttonTitle: 'Add Client',
          editButtonTitle: 'Edit Client',
          CreateForm: AgentandClientForm,
          EditForm: AgentandClientForm
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
