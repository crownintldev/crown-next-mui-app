import React, { useState,useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'src/common/materialTable/MaterialTable';
import useAgentAndClientColumns from 'src/common/materialTable/tableColumns/agentAndClient';
import { store } from 'src/store';
import NewMenuCsvUploader from 'src/common/materialTable/tableHeader/newHeaderMenu/NewMenu-CsvUploader';
//Forms
import AgentandClientForm from 'src/common/forms/member/AgentandClientForm';
// redux
import { fetchAgent } from 'src/store';
import HeaderMenuDrawer from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenuDrawer';
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
    fetchData:fetchAgent,
    FormTitle: Form.title,
    api:"agent"
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
        api={'agent'}
        apiData={apiData}
        NewHeaderMenu={newHeaderMenu}
        fetchData={fetchAgent}
        stateSelector='agent'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Agent',
          editFormTitle: 'Edit Agent',

          //header buttons drawer
          buttonTitle: 'Add Agent',
          editButtonTitle: 'Edit Agent',
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
