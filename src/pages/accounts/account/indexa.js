import React, { useEffect } from 'react'
import axios from 'axios'
import DataTable from 'src/common/table/DataTable'
import { columnData } from 'src/common/table/columnDataFunction'

//Forms
import EditAccountForm from 'src/common/forms/account/EditAccountForm'

// redux
import { fetchData } from 'src/store/apps/account'
import { useDispatch, useSelector } from 'react-redux'

// ** Store Imports
import { ReduxFetchAndGet } from 'src/utils/ReduxFetchAndGet'

const index = ({ apiData }) => {
  const dispatch = useDispatch()
  const store = ReduxFetchAndGet(fetchData, state => state.passport)

  const state = useSelector(state => state.account)
  console.log(state)

  // useEffect(()=>{dispatch(fetchData)},[])

  // table column data
  const columns = [
    columnData({
      field: 'remainingFee',
      headerName: 'Remaining Fee',
      href: ''
    }),
    columnData({
      field: 'totalFee',
      headerName: 'Total Fee',
      href: ''
    }),
    columnData({
      field: 'paidFee',
      headerName: 'Paid Fee',
      href: ''
    }),
    columnData({
      field: 'passportId.passportNumber',
      headerName: 'Passport Number',
      href: ''
    }),
    columnData({
      minWidth: 200,
      field: 'passportId.givenName',
      headerName: 'Given Name',
      href: ''
    }),

    // Visa Booking
    columnData({
      field: 'visaBooking.RefName',
      headerName: 'Ref Name',
      href: ''
    }),
    columnData({
      field: 'visaBooking.onModel',
      headerName: 'Ref',
      href: ''
    }),
    columnData({
      field: 'visaBooking.phone',
      headerName: 'Refer Phone',
      href: ''
    }),
    columnData({
      field: 'visaBooking.status',
      headerName: 'Status',
      href: ''
    }),
    columnData({
      field: 'updatedAt',
      headerName: 'Date',
      href: ''
    })
  ]

  return (
    <div>
      <DataTable
        apiData={apiData}
        // tavle columns
        columns={columns}
        // show data in table getting by redux
        fetchTableData={state.data}
        // drawer form titles
        formTitle={'Add Visa Service'}
        editFormTitle={'Edit Visa Booking'}
        //header buttons drawer
        // buttonTitle={'Add New Visa Service'}
        editButtonTitle={'Edit Visa Booking'}
        // forms
        // CreateForm={VisaServiceForm}
        EditForm={EditAccountForm}
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
