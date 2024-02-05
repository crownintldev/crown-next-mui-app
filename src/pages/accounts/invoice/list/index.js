import React from 'react'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useInvoiceColumns from 'src/common/materialTable/tableColumns/invoiceColumns'
import { useRouter } from 'next/router'
//redux
import { fetchInvoice } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
//headerMenu
import { getReducer } from 'src/store/apps/sliceActionReducer'
import { Button, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Box } from '@mui/system'

const index = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const setInvoice = getReducer('myInvoice')
  const invoiceData = useSelector((state) => state.invoice.data)
  const columns = useInvoiceColumns()
  const handleInvoice = (selectedIds) => {
    const invoiceValues = selectedIds.map(
      (id) => invoiceData?.length > 0 && invoiceData.find((item) => item._id === id)
    )
    dispatch(setInvoice(invoiceValues[0]))
    router.push('/accounts/invoice/edit')
  }
  const headerMenu = ({ selectedIds, handleClose, removeSelection }) => {
    return (
      <>
        {selectedIds && selectedIds.length === 1 && (
          <>
            <MenuItem
              sx={{
                py: 1,
                m: 0
              }}
              onClick={() => handleInvoice(selectedIds)}
            >
              <Box
                sx={{
                  fontSize: '0.8em',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '4px',
                  color: 'green'
                }}
              >
                  <Icon fontSize='0.8rem' icon='tabler:plus' />
                  Edit Invoice
              </Box>
            </MenuItem>
          </>
        )}
      </>
    )
  }
  return (
    <div>
      <MaterialTable
        api={'invoice'}
        fetchData={fetchInvoice}
        stateSelector='invoice'
        columns={columns}
        headerMenu={headerMenu}
        drawerProps={{}}
      />
    </div>
  )
}

export default index
