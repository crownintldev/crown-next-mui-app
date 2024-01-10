import React, { useEffect } from 'react'
import axios from 'axios'
import DataTable from 'src/common/table/DataTable'
import { columnData } from 'src/common/table/columnDataFunction'

//Forms
import EditVisaBookingForm from 'src/common/forms/booking/visaBooking/EditVisaBookingForm'

// redux
import { fetchData } from 'src/store/apps/booking/visaBooking'
import { ReduxFetchAndGet } from 'src/utils/ReduxFetchAndGet'

const index = ({ apiData }) => {
  const store = ReduxFetchAndGet(fetchData, state => state.visaBooking)

  // table column data
  const columns = [
    columnData({
      field: 'givenName',
      headerName: 'Given Name',
      href: ''
    }),
    columnData({
      minWidth: 200,
      field: 'passportNumber',
      headerName: 'Passport Number',
      href: ''
    }),
    columnData({
      field: 'phone',
      headerName: 'Phone',
      href: ''
    }),
    columnData({
      field: 'status',
      headerName: 'Status',
      href: ''
    }),
    columnData({
      field: 'onModel',
      headerName: 'Refer',
      href: ''
    }),
    columnData({
      minWidth: 200,
      field: 'RefName',
      headerName: 'Refer Name',
      href: ''
    }),
    columnData({
      field: 'processing.processingFee',
      headerName: 'Processing Fee',
      href: ''
    }),
    columnData({
      minWidth: 200,
      field: 'processing.visaFee',
      headerName: 'Processing - Visa Fee',
      href: ''
    }),
    columnData({
      minWidth: 200,
      field: 'confirmed.totalFee',
      headerName: 'Confirmed - Total Fee',
      href: ''
    }),
    columnData({ field: 'category', headerName: 'Category', href: '' }),
    columnData({
      field: 'destination',
      headerName: 'Destination',
      href: ''
    }),
    columnData({ field: 'type', headerName: 'Type', href: '' }),
    columnData({ field: 'duration', headerName: 'Duration', href: '' }),
    columnData({
      field: 'updatedAt',
      headerName: 'Changed At',
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
        fetchTableData={store.data}

        // drawer form titles
        formTitle={'Add Visa Service'}
        editFormTitle={'Edit Visa Booking'}

        //header buttons drawer
        // buttonTitle={'Add New Visa Service'}
        editButtonTitle={'Edit Visa Booking'}

        // forms
        // CreateForm={VisaServiceForm}
        EditForm={EditVisaBookingForm}
        multiSelected={true}
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
