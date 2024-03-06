import React, { useState } from 'react';
import axios from 'axios';
import GroupTable from 'src/common/materialTable/groupTable/GroupTable';

import useSupplierAccountPaymentHistory from 'src/common/materialTable/tableColumns/supplierAccountPaymentHistory';
import { fetchSupplierAccoutPaymentHistory } from 'src/store';

//
const index = ({ apiData }) => {
  // open media drawer handler

  const columns = useSupplierAccountPaymentHistory();

  return (
    <div>
      <GroupTable
        api={'supplier-account-payment-history'}
        //  apiData={apiData}
        childColumns={[]}
        columns={columns}
        fetchData={fetchSupplierAccoutPaymentHistory}
        stateSelector='supplierAccoutPaymentHistory'
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
