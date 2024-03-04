import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'src/common/table/DataTable';
import MaterialTable from 'src/common/materialTable/MaterialTable';
import { useMemo } from 'react';
import { columnData } from 'src/common/table/columnDataFunction';
import useTableColumns from 'src/common/materialTable/tableColumns/visaBookingColumns';
import useBusinessSettingColumns from 'src/common/materialTable/tableColumns/hotelBookingColumns';
import Image from 'next/image';

//Forms
import EditVisaBookingForm from 'src/common/forms/booking/visaBooking/EditVisaBookingForm';
import PassportForm from 'src/common/forms/booking/passport/PassportForm';

// redux
import { fetchBusinesssetting } from 'src/store';
import { ReduxFetchAndGet } from 'src/utils/ReduxFetchAndGet';
//headerMenu
import NewHeaderMenuVisaBooking from 'src/common/materialTable/tableHeader/newHeaderMenu/NewMenu-VisaBooking';
import HeaderMenuVisaBooking from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenu-VisaBooking';
import HeaderMenuDrawer from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenuDrawer';
//
import { MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import Icon from 'src/@core/components/icon';
import FormDrawer from 'src/common/drawer/FormDrawer';
import MediaDrawer from 'src/common/drawer/MediaDrawer';

const index = ({ apiData }) => {
  // open media drawer handler
  const openMediaDrawer = (row) => {
    // console.log('row data', row.original)
    setSelectedRowData(row.original);
    setMediaDrawerOpen(true);
  };

  const columns = useBusinessSettingColumns(openMediaDrawer);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const [selectedIds, setSelectedIds] = useState('');
  const [removeSelection, setRemoveSelection] = useState({});
  const [mediaDrawerOpen, setMediaDrawerOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [Form, SetForm] = useState({
    Form: null
  });

  const formDrawer = () =>
    HeaderMenuDrawer({
      selectedIds,
      drawerOpen,
      toggleDrawer,
      Form: Form.Form,
      removeSelection: removeSelection.removeSelection
    });
  const headerMenu = ({ selectedIds, handleClose, removeSelection }) => {
    return HeaderMenuVisaBooking({
      setSelectedIds,
      setRemoveSelection,
      SetForm,
      toggleDrawer,
      selectedIds,
      handleClose,
      removeSelection
    });
  };

  return (
    <div>
      {formDrawer()}
      <MaterialTable
        api={'businesssetting'}
        apiData={apiData}
        fetchData={fetchBusinesssetting}
        stateSelector='businesssetting'
        columns={columns}
        // headerMenu={HeaderMenuVisaBooking}
        headerMenu={headerMenu}
        NewHeaderMenu={NewHeaderMenuVisaBooking}
        drawerProps={{
          formTitle: 'Add Business',
          buttonTitle: 'Add Business',
          editFormTitle: 'Edit Business Details',
          editButtonTitle: 'Edit Business',
          CreateForm: PassportForm,
          EditForm: EditVisaBookingForm,
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
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/visa-bookings/card`);
    const apiData = res.data;

    return {
      props: {
        apiData
      }
    };
  } catch (err) {
    console.error(err.message);
    return {
      props: {
        apiData: []
      }
    };
  }
};

export default index;