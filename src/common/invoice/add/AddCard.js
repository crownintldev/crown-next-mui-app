// NEXT Imports
import Link from 'next/link'

// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import { useTheme } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import { TextField } from '@mui/material'

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
  const { clients, invoiceNumber, selectedClient, setSelectedClient, toggleAddCustomerDrawer,cardHeader,invoiceDataArray } =
    props

  // ** States
  //AddCardInvoiceTo states
  const [userCategory, setUserCategory] = useState(null)
  const [selectUser, setSelectUser] = useState(null)
  const [invoiceData, setInvoiceData] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)

  //**end AddCardInvoiceTo states

  // ** Hook
  const theme = useTheme()

  // ** Deletes form
  const data = useSelector(state => state.invoice.data)


  const options = [
    { label: 'Account', link: '/accounts/account/' },
    { label: 'Booking', link: '/accounts/account/' },
    { label: 'Flight', link: '/accounts/account/' }
  ]

  const handleOptionSelect = (event, option) => {
    setSelectedOption(option)
  }

  return (
    <Card>
      {/* Header ---------------------------------------------------------------*/}
      <CardContent
        sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}
      >
        <AddCardHeader invoiceNumber={invoiceNumber} cardHeader={cardHeader} />
      </CardContent>

      <Divider />

      <CardContent
        sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}
      >
        {!invoiceDataArray || invoiceDataArray.length === 0 ? (
          // Error message
          <Box
            sx={{
              textAlign: 'center',
              p: theme.spacing(4),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: 4
            }}
          >
            <Typography variant='h2' sx={{ mb: 1.5 }}>
              No Invoices Created, Invoices create first...
            </Typography>
            <Stack spacing={1} sx={{ width: 250 }}>
              <div>
                <Autocomplete
                  id='custom-autocomplete'
                  options={options}
                  getOptionLabel={option => option.label}
                  onChange={handleOptionSelect}
                  renderInput={params => <TextField {...params} label='Select your creation' />}
                  renderOption={(props, option) => (
                    <Link href={option.link}>
                      <li {...props}>
                        <span>{option.label}</span>
                      </li>
                    </Link>
                  )}
                />
              </div>
            </Stack>
          </Box>
        ) : (
          // Normal rendering
          invoiceDataArray.map(item => {
            const { by: clientData, amount, visaBookingIds } = item

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
          })
        )}
      </CardContent>

      <Divider />
      {/* ItemWithTotal ------------------------------------------------------- */}
      <CardContent
        sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}
      >
        <AddCardItemWithTotal data={data} invoiceDataArray={invoiceDataArray}/>
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
