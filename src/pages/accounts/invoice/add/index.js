// ** React Imports
import { useEffect, useState } from 'react';
import { getInvoiceNumber } from 'src/action/invoice';
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
import { accumulateBillingDetails, mergeData } from '../../../../common/invoice/invoiceFunction';

const InvoiceAdd = ({ apiClientData }) => {
  // ** State
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState(apiClientData);
  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen);
  // card Header State
  const tomorrowDate = new Date().setDate(new Date().getDate() + 7);
  const [issueDate, setIssueDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date(tomorrowDate));

  const invoiceData = useSelector((state) => state.myInvoice.data);
  let mergeInvoiceData = mergeData(invoiceData);
  let billingDetail = accumulateBillingDetails(invoiceData);
  const companyData = useSelector((state) => state.businessSetting.data[0]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBusinesssetting({}));
    getInvoiceNumber()
    .then(res => {
      // console.log(res)
      setInvoiceNumber(res.data);
    })
    .catch(err => {
      console.error("Failed to fetch invoice number:", err);
      // Handle error case here (e.g., setting a default state or displaying an error message)
    });
  }, []);
  // console.log(invoiceNumber);
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
            billingDetail={billingDetail}
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
            invoiceData={mergeInvoiceData}
            billingDetail={billingDetail}
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
