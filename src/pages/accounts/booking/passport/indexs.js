import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from 'src/common/table/DataTable'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import { columnData } from 'src/common/table/columnDataFunction'
//Forms
import PassportForm from 'src/common/forms/booking/passport/PassportForm'
import EditPassportForm from 'src/common/forms/booking/passport/EditPassportForm'
//
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import { MenuItem, Menu } from '@mui/material'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// redux
import { fetchData } from 'src/store/apps/booking/passport'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

const index = ({ apiData }) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.passport)
  useEffect(() => {
    store.data.length < 1 &&
      dispatch(
        fetchData({
          limit: 20,
          page: 1
        })
      )
  }, [])

  const RowOptions = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    console.log(id)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleDelete = () => {
      dispatch(deleteUser(id))
      handleRowOptionsClose()
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            href='/apps/user/view/account'
            onClick={handleRowOptionsClose}
          >
            <Icon icon='tabler:eye' fontSize={20} />
            View
          </MenuItem>
          <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:edit' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:trash' fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </>
    )
  }

  // table column data
  const columns = [
    columnData({ field: 'status', headerName: 'Status', href: '' }),
    columnData({ field: 'givenName', headerName: 'Given Name', href: '' }),
    columnData({ field: 'city', headerName: 'City', href: '' }),
    columnData({ field: 'surname', headerName: 'Surname', href: '' }),
    columnData({ field: 'cnic', headerName: 'CNIC', href: '' }),
    columnData({ field: 'country', headerName: 'Country', href: '' }),
    columnData({ field: 'dob', headerName: 'Date of Birth', href: '' }),
    columnData({ field: 'doe', headerName: 'Date of Expiry', href: '' }),
    columnData({ field: 'doi', headerName: 'Doi', href: '' }),
    columnData({ field: 'fatherName', headerName: 'Father Name', href: '' }),
    columnData({ field: 'gender', headerName: 'Gender', href: '' }),
    columnData({
      field: 'issuingAuthority',
      headerName: 'Issuing Authority',
      href: ''
    }),
    columnData({ field: 'nationality', headerName: 'Nationality', href: '' }),
    columnData({ field: 'onModel', headerName: 'Refer', href: '' }),
    columnData({ field: 'by.fullName', headerName: 'Refer Name', href: '' }),
    columnData({ field: 'by.companyName', headerName: 'Company Name', href: '' }),
    columnData({ field: 'by.phone', headerName: 'Refer Phone #', href: '' }),
    columnData({
      field: 'passportNumber',
      headerName: 'Passport Number',
      href: ''
    }),
    columnData({ field: 'pob', headerName: 'Place of Birth', href: '' }),
    columnData({ field: 'religion', headerName: 'Religion', href: '' }),
    columnData({ field: 'remarks', headerName: 'Remarks', href: '' }),
    columnData({
      field: 'bookletNumber',
      headerName: 'Booklet Number',
      href: ''
    }),
    columnData({
      field: 'trackingNumber',
      headerName: 'Tracking Number',
      href: ''
    }),
    columnData({ field: 'updatedAt', headerName: 'Updated', href: '' }),

    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row._id} />
    }
  ]

  return (
    <div>
      <DataTable
        apiData={apiData}
        // tavle columns
        columns={columns}
        // show data in table getting by redux
        fetchTableData={store.data}
        // drawer form titles
        formTitle={'Add Passport'}
        editFormTitle={'Edit Passport'}
        //header buttons drawer
        buttonTitle={'Add New Passport'}
        editButtonTitle={'Edit Passport'}
        // forms
        CreateForm={PassportForm}
        EditForm={EditPassportForm}
        fetchData={fetchData}
      />
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData = res.data

  return {
    props: {
      apiData
    }
  }
}

export default index
