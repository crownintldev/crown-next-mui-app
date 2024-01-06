// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'

import { top100Films } from 'src/@fake-db/autocomplete'
//action
import { agentList } from 'src/action/users/agent'
import { clientList } from 'src/action/users/client'
import { companyList } from 'src/action/users/company'
import { filterInvoiceAccount } from 'src/action/account'
import { fetchActionData } from 'src/action/fetchData'
import CustomTextField from 'src/@core/components/mui/text-field'

import MuiAutoComplete from 'src/common/dataEntry/MuiAutoComplete'
// ** Custom Component Imports

import { Autocomplete, TextField } from '@mui/material'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  '&:not(:last-child)': {
    paddingRight: `${theme.spacing(2)} !important`
  }
}))

const AddCardInvoiceTo = ({
  data: values,
  selectedClient,
  setSelectedClient,
  toggleAddCustomerDrawer,
  clients,
  invoiceData,
  setInvoiceData,
  setUserCategory,
  selectUser,
  setSelectUser
}) => {
  //getting values to search passport list from backend
  //getting values end
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState('')
  const { accountDetails, grandFee } = invoiceData

  // ** Handle Invoice To Change
  const handleInvoiceChange = event => {
    setSelected(event.target.value)
    if (clients !== undefined) {
      setSelectedClient(clients.filter(i => i.name === event.target.value)[0])
    }
  }

  const handleAddNewCustomer = () => {
    toggleAddCustomerDrawer()
  }

  const theme = useTheme()

  const data = clients.map(client => {
    return {
      title: client.name
    }
  })
  const userCategoryOption = ['Client', 'Agent', 'Company']

  // const getUser = async findUsersList => {
  //   try {
  //     const res = await findUsersList()
  //     setUsers(res.data.data)
  //   } catch (err) {
  //     console.log('===========', err)
  //   }
  // }
  const handleUserCategory = (event, newValue) => {
    // Handle the change
    setUsers([])
    setInvoiceData([])
    setSelectUser(null)
    setUserCategory(newValue)

    if (newValue === 'Client') {
      fetchActionData(clientList, setUsers)
    } else if (newValue === 'Agent') {
      fetchActionData(agentList, setUsers)
    } else if (newValue === 'Company') {
      fetchActionData(companyList, setUsers)
    }
  }

  const handleUserSelect = (event, newValue) => {
    // Handle the change
    setSelectUser(newValue)
    fetchActionData(() => filterInvoiceAccount({ userId: newValue._id }), setInvoiceData, true)
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} sx={{ mb: { lg: 0, xs: 4 } }}>
        <Typography variant='h6' sx={{ mb: 6 }}>
          Invoice To:
        </Typography>

        {values.map(item => (
          <Box key={item._id}>
            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
              {item.by.fullName && `Name:  ${item.by.fullName}`}
              {item.by.companyName && `Company:  ${item.by.companyName}`}
            </Typography>
            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
              Address: {item.by.address}
            </Typography>
            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
              Contact: {item.by.phone}
            </Typography>
          </Box>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}
      >
        <div>
          <Typography variant='h6' sx={{ mb: 6 }}>
            Billing Detail:
          </Typography>
          <TableContainer>
            <Table>
              <TableBody
                sx={{ '& .MuiTableCell-root': { py: `${theme.spacing(0.75)} !important` } }}
              >
                <TableRow>
                  <MUITableCell>
                    <Typography sx={{ color: 'text.secondary' }}>Total Due:</Typography>
                  </MUITableCell>
                  <MUITableCell>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                      Rs: {grandFee?.totalDue}
                    </Typography>
                  </MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell>
                    <Typography sx={{ color: 'text.secondary' }}>Bank name:</Typography>
                  </MUITableCell>
                  <MUITableCell>
                    <Typography sx={{ color: 'text.secondary' }}>American Bank</Typography>
                  </MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell>
                    <Typography sx={{ color: 'text.secondary' }}>Country:</Typography>
                  </MUITableCell>
                  <MUITableCell>
                    <Typography sx={{ color: 'text.secondary' }}>United States</Typography>
                  </MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell>
                    <Typography sx={{ color: 'text.secondary' }}>IBAN:</Typography>
                  </MUITableCell>
                  <MUITableCell>
                    <Typography sx={{ color: 'text.secondary' }}>ETD95476213874685</Typography>
                  </MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell>
                    <Typography sx={{ color: 'text.secondary' }}>SWIFT code:</Typography>
                  </MUITableCell>
                  <MUITableCell>
                    <Typography sx={{ color: 'text.secondary' }}>BR91905</Typography>
                  </MUITableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  )
}

export default AddCardInvoiceTo
