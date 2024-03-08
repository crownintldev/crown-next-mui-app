import React, { useState } from 'react';
import axios from 'axios';
import GroupTable from 'src/common/materialTable/groupTable/GroupTable';
import { useAdditionalSupplierAccountColumn,useChildAdditionalSupplierAccountColumn } from 'src/common/materialTable/tableColumns/additionalSupplierAccountColumns';

// redux
import { fetchAdditionalSupplierAccount } from 'src/store';

const index = ({ apiData }) => {
  const columns = useAdditionalSupplierAccountColumn();
  const childColumns = useChildAdditionalSupplierAccountColumn();


  return (
    <div>
      <GroupTable
        api={'additional-supplier-account'}
        //  apiData={apiData}
        columns={columns}
        childColumns={childColumns}
        fetchData={fetchAdditionalSupplierAccount}
        stateSelector='additionalSupplierAccount'
        selectedId=""
        logTabLink='#'
        drawerProps={{
          editFormTitle: '',
          editButtonTitle: '',
          EditForm: "",
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
