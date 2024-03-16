import React, { useState } from 'react';
import axios from 'axios';
import GroupTable from 'src/common/materialTable/groupTable/GroupTable';

import useAccountPaymentHistory from 'src/common/materialTable/tableColumns/accountPaymentHistory';
import { fetchAccoutPaymentHistory } from 'src/store';

//
const index = ({ apiData }) => {
 
  // open media drawer handler
  

  const columns = useAccountPaymentHistory();

  return (
    <div>
      <GroupTable
        api={'account-payment-history'}
        //  apiData={apiData}
        childColumns={[]}
        columns={columns}
        fetchData={fetchAccoutPaymentHistory}
        stateSelector='accoutPaymentHistory'
        tab1='/accounts/account/visa-account'
        tab2='/accounts/account/visa-account-log'
        drawerProps={{
          editFormTitle: '',
          //header buttons drawer
          editButtonTitle: '',
          // forms
          EditForm: {},
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
