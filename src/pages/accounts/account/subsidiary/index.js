import React, { useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'src/common/materialTable/MaterialTable';
import useSubsidiaryColumns from 'src/common/materialTable/tableColumns/subsidiaryColumns';
//Forms
import SubsidiaryForm from 'src/common/forms/subsidiary/subsidiaryForm';
// redux
import { fetchSubsidiary } from 'src/store';

const index = ({ apiData }) => {
  const columns = useSubsidiaryColumns();

  return (
    <div>
      <MaterialTable
        api={'subsidiary'}
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
