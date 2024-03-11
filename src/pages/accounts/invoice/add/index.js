// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Grid from '@mui/material/Grid';

// ** Third Party Components
import axios from 'axios';

// ** Demo Components Imports

import AddCard from 'src/common/invoice/add/AddCard';
import AddActions from 'src/common/invoice/add/AddActions';
import AddNewCustomers from 'src/common/invoice/add/AddNewCustomer';

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusinesssetting } from 'src/store';

const mergeData = (data) => {
  if (data && data.length > 0) {
    const merged = new Map();
    data.forEach((item) => {
      const key = `${
        item && item.by && item.by.fullName ? item.by.fullName : "N/A"
      }|${item && item.by && item.by.refer ? item.by.refer : "N/A"}`;
      if (!merged.has(key)) {
        merged.set(key, {
          by: item.by,
          visaBookingIds: item.visaBookingIds ? [...item.visaBookingIds] : [],
          visaTicketBookingIds: item.visaTicketBookingIds
            ? [...item.visaTicketBookingIds]
            : [],
        });
      } else {
        const currentItem = merged.get(key);
        if (item.visaBookingIds) {
          currentItem.visaBookingIds.push(...item.visaBookingIds);
        }
        if (item.visaTicketBookingIds) {
          currentItem.visaTicketBookingIds.push(...item.visaTicketBookingIds);
        }
      }
    });
    return Array.from(merged.values());
  }
};

const InvoiceAdd = ({ apiClientData, invoiceNumber }) => {
  // ** State
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState(apiClientData);
  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen);
  // card Header State
  const tomorrowDate = new Date().setDate(new Date().getDate() + 7);
  const [issueDate, setIssueDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date(tomorrowDate));
  
  const invoiceData = useSelector((state) => state.myInvoice.data);
  let mergeInvoiceData = mergeData(invoiceData)
  const companyData = useSelector((state) => state.businessSetting.data[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBusinesssetting({}));
  }, []);
  const cardHeaderDetails = {
    businessName: companyData?.businessName,
    address: companyData?.businessAddress,
    contacts: `${companyData?.phone1} ${companyData?.phone2}`,
    logo: companyData?.logo?.url
  };

  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard
            clients={clients}
            invoiceNumber={invoiceNumber}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            toggleAddCustomerDrawer={toggleAddCustomerDrawer}
            cardHeader={{
              detail: cardHeaderDetails,
              setIssueDate,
              setDueDate,
              issueDate,
              dueDate
            }}
            invoiceData={mergeInvoiceData}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions
            cardHeader={{
              detail: cardHeaderDetails,
              setIssueDate,
              setDueDate,
              issueDate,
              dueDate
            }}
            invoiceData={invoiceData}
          />
        </Grid>
      </Grid>
      <AddNewCustomers
        clients={clients}
        open={addCustomerOpen}
        setClients={setClients}
        toggle={toggleAddCustomerDrawer}
        setSelectedClient={setSelectedClient}
      />
    </DatePickerWrapper>
  );
};

export const getStaticProps = async () => {
  const clientResponse = await axios.get('/apps/invoice/clients');
  const apiClientData = clientResponse.data;

  const allInvoicesResponse = await axios.get('/apps/invoice/invoices', {
    params: { q: '', status: '' }
  });
  const lastInvoiceNumber = Math.max(
    ...allInvoicesResponse.data.allData.map((i) => i.id)
  );

  return {
    props: {
      apiClientData,
      invoiceNumber: lastInvoiceNumber + 1
    }
  };
};

//
export default InvoiceAdd;
