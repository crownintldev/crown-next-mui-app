// ** React Imports
import { useState } from 'react'
//redux
import { useSelector } from 'react-redux'
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports

import AddCard from 'src/common/invoice/add/AddCard'
import AddActions from 'src/common/invoice/add/AddActions'
import AddNewCustomers from 'src/common/invoice/add/AddNewCustomer'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const InvoiceAdd = ({ apiClientData }) => {
  const invoiceData = useSelector((state) => state.myInvoice.data)
  const cardHeaderDetails = {
    address: invoiceData?.detail?.address,
    contacts: invoiceData?.detail?.contacts
  }
  // ** State
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, setClients] = useState(apiClientData)
  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen)
  // card Header State
  const tomorrowDate = new Date().setDate(new Date().getDate() + 7)
  const [issueDate, setIssueDate] = useState(invoiceData?.issueDate)
  const [dueDate, setDueDate] = useState(invoiceData?.dueDate)

  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard
            clients={clients}
            invoiceNumber={invoiceData?.invoiceNumber || ""}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            toggleAddCustomerDrawer={toggleAddCustomerDrawer}
            cardHeader={{ detail: cardHeaderDetails, setIssueDate, setDueDate, issueDate, dueDate }}
            invoiceDataArray={invoiceData?.invoiceDataArray}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions
            cardHeader={{ detail: cardHeaderDetails, setIssueDate, setDueDate, issueDate, dueDate }}
            invoiceDataArray={invoiceData?.invoiceDataArray}
            invoiceEditId={invoiceData._id}
            invoiceNumber={invoiceData?.invoiceNumber || ""}
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
  )
}

export const getStaticProps = async () => {
  const clientResponse = await axios.get('/apps/invoice/clients')
  const apiClientData = clientResponse.data

  const allInvoicesResponse = await axios.get('/apps/invoice/invoices', {
    params: { q: '', status: '' }
  })
  const lastInvoiceNumber = Math.max(...allInvoicesResponse.data.allData.map((i) => i.id))

  return {
    props: {
      apiClientData,
      invoiceNumber: lastInvoiceNumber + 1
    }
  }
}

//
export default InvoiceAdd
