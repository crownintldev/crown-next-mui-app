// ** MUI Imports
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Box from '@mui/material/Box'
import { Theme, useTheme } from '@mui/material/styles'
import toast from 'react-hot-toast'
import { IconButton, Menu, MenuItem } from '@mui/material'
// import { mdiCallToAction } from '@mdi/js';
import Button from '@mui/material/Button'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import { useDispatch, useSelector } from 'react-redux'
// import { setInvoice } from 'src/store/apps/myInvoice'
import { axiosErrorMessage } from 'src/utils/helperfunction'
import ExportButton from '../tableHeader/ExportButton'
import { getReducer } from 'src/store/apps/sliceActionReducer'

const TableHeader = props => {
  const router = useRouter()
  const theme = useTheme()
  const dispatch = useDispatch()
  const setInvoice = getReducer('myInvoice')
  // useSelector
  const accountData = useSelector(state => state.account.data)

  const data = useSelector(state => state?.myInvoice?.data)

  // ** Props
  const {
    toggle,
    buttonTitle,
    ejectValue,
    fetchData,
    setChildRowSelection,
    selectionRow,
    api,
    table,
    tableData
  } = props
  // console.log(selectionRow)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleInvoice = () => {
    const invoiceValues = selectionRow.map(
      id => accountData?.length > 0 && accountData.find(item => item._id === id)
    )
    dispatch(setInvoice(invoiceValues))
    router.push('/accounts/invoice/add/')
    handleClose()
  }

  const handleEject = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/account/eject`, ejectValue)
      if (response.data) {
        dispatch(
          fetchData({
            limit: 20,
            page: 1
          })
        )
        setChildRowSelection({})
        toast.success('Eject Successfully', { position: 'top-center' })
      }
    } catch (error) {
      console.log(axiosErrorMessage(error))
      toast.error(axiosErrorMessage(error), { position: 'top-center' })
    }
  }

  const handleRemove = async () => {
    if (!api) {
      return toast.error('api not found', { position: 'top-center' })
    }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/${api}/remove`, {
        ids: selectionRow
      })
      if (response.data) {
        dispatch(
          fetchData({
            limit: 20,
            page: 1
          })
        )
        toast.success('Delete Successfully', { position: 'top-center' })
      }
    } catch (error) {
      console.log(axiosErrorMessage(error))
      toast.error(axiosErrorMessage(error), { position: 'top-center' })
    }
  }

  return (
    <Box>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* {buttonTitle && (
          <Button onClick={toggle} variant='contained'  sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            {buttonTitle}
          </Button>
        )} */}
        <IconButton onClick={handleClick}>
          <Icon fontSize='1.5rem' icon='mdi:call-to-action' color='#2b60fe' />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {buttonTitle && (
            <MenuItem onClick={handleClose}>
              <Box
                onClick={toggle}
                sx={{
                  fontSize: '0.8em',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '4px',
                  color: '#2b60fe'
                }}
              >
                <Icon fontSize='1.125rem' icon='tabler:plus' />
                {buttonTitle}
              </Box>
            </MenuItem>
          )}
          {ejectValue.visaBookingIds.length > 0 && (
            <MenuItem onClick={handleClose}>
              <Button onClick={handleEject} color='error' size='small'>
                <Icon fontSize='1.125rem' icon='tabler:minus' />
                Eject Passport
              </Button>
            </MenuItem>
          )}
          {selectionRow?.length > 0 && (
            <MenuItem onClick={handleInvoice}>
              <Button color='success' size='small'>
                <Icon fontSize='1.125rem' icon='tabler:plus' />
                Create Invoice
              </Button>
            </MenuItem>
          )}
          {selectionRow?.length > 0 && (
            <MenuItem onClick={handleRemove}>
              <Button color='error' size='small'>
                <Icon fontSize='1.125rem' icon='tabler:plus' />
                Delete Account
              </Button>
            </MenuItem>
          )}
        </Menu>
        {/* ----------Export data--------- */}
        <ExportButton table={table} tableData={tableData} />
      </Box>
    </Box>
  )
}

export default TableHeader
