// ** React Imports
import { useState, useEffect } from 'react'
// ** MUI Imports
import Card from '@mui/material/Card'

import Divider from '@mui/material/Divider'

import InputLabel from '@mui/material/InputLabel'

import { useTheme } from '@mui/material/styles'

import CardContent from '@mui/material/CardContent'

// ** Custom Component Imports
import CustomTextField from 'src/@core/components/mui/text-field'

//AddCardComponent
import AddCardHeader from '../invoiceComponents/addCard/AddCardHeader'
import AddCardInvoiceTo from '../invoiceComponents/addCard/AddCardInvoiceTo'
import AddCardItemSelect from '../invoiceComponents/addCard/AddCardItemSelect'
import AddCardItemWithTotal from '../invoiceComponents/addCard/AddCardItemWithTotal'

import { useSelector } from 'react-redux'
const AddCard = props => {
  // ** Props
  const { clients, invoiceNumber, selectedClient, setSelectedClient, toggleAddCustomerDrawer } =
    props

  // ** States
  //AddCardInvoiceTo states
  const [userCategory, setUserCategory] = useState(null)
  const [selectUser, setSelectUser] = useState(null)
  const [invoiceData, setInvoiceData] = useState([])
  //**end AddCardInvoiceTo states

  // ** Hook
  const theme = useTheme()

  // ** Deletes form
  const data = useSelector(state => state.invoice.data)
  const invoiceDataArray = useSelector(state => state.myInvoice.data)
  invoiceDataArray.map(item => console.log('item', item))
  console.log('invoice data ary', invoiceDataArray)

  const {
    by: clientData,
    amount,
    visaBookingIds
  } = invoiceDataArray.length > 0 ? invoiceDataArray[0] : {}
  useEffect(() => {
    console.log('Updated invoices', data)
  }, [data])

  return (
    <Card>
      {/* Header ---------------------------------------------------------------*/}
      <CardContent
        sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}
      >
        <AddCardHeader invoiceNumber={invoiceNumber} />
      </CardContent>

      <Divider />

      {/* Invoice To ------------------------------------------------------- */}
      <CardContent
        sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}
      >
        {invoiceDataArray.map(item => {
          const { by: clientData, amount, visaBookingIds } = item
          console.log('item output', clientData, amount, visaBookingIds)

          return (
            <>
              <AddCardInvoiceTo
                data={data}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                toggleAddCustomerDrawer={toggleAddCustomerDrawer}
                clients={clients}
                setInvoiceData={setInvoiceData}
                invoiceData={invoiceData}
                setUserCategory={setUserCategory}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                clientData={clientData}
                amount={amount}
              />
              <Divider />
              <AddCardItemSelect
                data={data}
                clients={clients}
                invoiceData={invoiceData}
                setInvoiceData={setInvoiceData}
                userCategory={userCategory}
                selectUser={selectUser}
                visaBookingIds={visaBookingIds}
              />
            </>
          )
        })}
      </CardContent>

      <Divider />
      {/* ItemWithTotal ------------------------------------------------------- */}
      <CardContent
        sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}
      >
        <AddCardItemWithTotal data={data} invoiceData={invoiceData} />
      </CardContent>

      <Divider />
      {/* Note ------------------------------------------------------- */}
      <CardContent sx={{ px: [6, 10] }}>
        <InputLabel
          htmlFor='invoice-note'
          sx={{
            mb: 2,
            fontWeight: 500,
            fontSize: theme.typography.body2.fontSize,
            lineHeight: 'normal'
          }}
        >
          Note:
        </InputLabel>
        <CustomTextField
          rows={2}
          fullWidth
          multiline
          id='invoice-note'
          defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
        />
      </CardContent>
    </Card>
  )
}

export default AddCard
