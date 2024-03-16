import React, { useState } from 'react';
import axios from 'axios';
import GroupTable from 'src/common/materialTable/groupTable/GroupTable';
import {
  useSupplierAccountColumn,
  useChildSupplierAccountColumn
} from 'src/common/materialTable/tableColumns/supplierAccountColumns';

//Forms
import SupplierAccountForm from 'src/common/forms/supplierAccount/SupplierAccountForm';
// redux
import { fetchSupplierAccount } from 'src/store';
import MediaDrawer from 'src/common/drawer/MediaDrawer';
//
const index = ({ apiData }) => {
  // open media drawer handler
  const openMediaDrawer = (row) => {
    console.log('acc row data', row.original);
    setSelectedRowData(row.original);
    setMediaDrawerOpen(true);
  };

  const columns = useSupplierAccountColumn(openMediaDrawer);
  const childColumns = useChildSupplierAccountColumn();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [mediaDrawerOpen, setMediaDrawerOpen] = useState(false);

  return (
    <div>
      <GroupTable
        api={'supplier-account'}
        //  apiData={apiData}
        columns={columns}
        childColumns={childColumns}
        fetchData={fetchSupplierAccount}
        stateSelector='supplierAccount'
        selectedId="supplierId"
        tab1='/accounts/account/supplier-account'
        tab2='/accounts/account/supplier-account-log'
        drawerProps={{
          editFormTitle: 'Edit Account',
          editButtonTitle: 'Edit Account',
          EditForm: SupplierAccountForm,
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
