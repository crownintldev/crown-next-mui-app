import React, { useState,useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'src/common/materialTable/MaterialTable';
import useTicketBookingColumns from 'src/common/materialTable/tableColumns/ticketBookingColumns';
//Forms
import TicketBookingForm from 'src/common/forms/booking/ticketBooking/TicketBookingForm';

// redux
import { fetchTicketBooking } from 'src/store';
import HeaderMenuDrawer from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenuDrawer';
//header menu
import HeaderMenuTicketBooking from 'src/common/materialTable/tableHeader/headerMenu/HeaderMenu-TicketBooking';

const index = ({ apiData }) => {
  const columns = useTicketBookingColumns();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const [selectedIds, setSelectedIds] = useState('');
  const [removeSelection, setRemoveSelection] = useState({});
  const [Form, SetForm] = useState({
    Form: null,
    title: ''
  });

  const formDrawer = () =>
    HeaderMenuDrawer({
      selectedIds,
      drawerOpen,
      toggleDrawer,
      Form: Form.Form,
      FormTitle: Form.title,
      removeSelection: removeSelection.removeSelection
    });
  const headerMenu = ({ selectedIds, handleClose, removeSelection }) => {
    return HeaderMenuTicketBooking({
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
        api={'ticket-booking'}
        headerMenu={headerMenu}
        apiData={apiData}
        fetchData={fetchTicketBooking}
        stateSelector='ticketBooking'
        columns={columns}
        drawerProps={{
          formTitle: 'Ticket Booking',
          editFormTitle: 'Edit Ticket Booking',

          //header buttons drawer
          buttonTitle: 'Ticket Booking',
          editButtonTitle: 'Edit Ticket Booking',
          CreateForm: TicketBookingForm,
          EditForm: TicketBookingForm
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
