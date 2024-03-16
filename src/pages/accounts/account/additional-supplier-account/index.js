import React, { useState } from 'react';
import axios from 'axios';
import AdditionalSupplierAccountForm from 'src/common/forms/additionalSupplierAccount/AdditionalSupplierAccountForm';
import GroupTable from 'src/common/materialTable/groupTable/GroupTable';
import {
  useAdditionalSupplierAccountColumn,
  useChildAdditionalSupplierAccountColumn
} from 'src/common/materialTable/tableColumns/additionalSupplierAccountColumns';

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
        selectedId='additionalSupplierId' //this id we are sending in backend
        tab1='/accounts/account/additional-supplier-account'
        tab2='/accounts/account/additional-supplier-account-log'
        drawerProps={{
          editFormTitle: 'Edit Account',
          editButtonTitle: 'Edit Account',
          EditForm: AdditionalSupplierAccountForm
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
