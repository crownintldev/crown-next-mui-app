import React, { useState } from 'react';
import axios from 'axios';
import GroupTable from 'src/common/materialTable/groupTable/GroupTable';

import useSupplierAccountPaymentHistory from 'src/common/materialTable/tableColumns/supplierAccountPaymentHistory';
import { fetchAdditionalSupplierAccoutPaymentHistory } from 'src/store';

//
const index = ({ apiData }) => {
  // open media drawer handler

  const columns = useSupplierAccountPaymentHistory();

  return (
    <div>
      <GroupTable
        api={'additional-supplier-account-payment-history'}
        //  apiData={apiData}
        childColumns={[]}
        columns={columns}
        fetchData={fetchAdditionalSupplierAccoutPaymentHistory}
        stateSelector='additionalSupplierAccoutPaymentHistory'
        tab1='/accounts/account/additional-supplier-account'
        tab2='/accounts/account/additional-supplier-account-log'
        drawerProps={{
          editFormTitle: '',
          //header buttons drawer
          editButtonTitle: '',
          // forms
          EditForm: {}
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
