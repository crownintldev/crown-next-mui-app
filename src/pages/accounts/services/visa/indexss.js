import React, { useEffect } from 'react'
import axios from 'axios'
import DataTable from 'src/common/table/DataTable'
import { columnData } from 'src/common/table/columnDataFunction'

//Forms
import VisaServiceForm from 'src/common/forms/services/visaService/VisaServiceForm'

// redux
import { fetchData } from 'src/store/apps/services/visaService'
import { ReduxFetchAndGet } from 'src/utils/ReduxFetchAndGet'

const index = ({ apiData }) => {
  const store = ReduxFetchAndGet(fetchData, state => state.visaService)

  // table column data
  const columns = [
    columnData({ field: 'category.name', headerName: 'Category', href: '' }),
    columnData({
      field: 'destination.name',
      headerName: 'Destination',
      href: ''
    }),
    columnData({ field: 'type.name', headerName: 'Type', href: '' }),
    columnData({ field: 'duration.name', headerName: 'Duration', href: '' }),
    columnData({
      field: 'processing.processingFee',
      headerName: 'Processing Fee',
      href: ''
    }),
    columnData({
      field: 'processing.visaFee',
      headerName: 'Processing - Visa Fee',
      href: ''
    }),
    columnData({
      field: 'confirmed.totalFee',
      headerName: 'Confirmed - Total Fee',
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
        fetchTableData={store && store.data.length > 0 && store.data}

        // drawer form titles
        formTitle={'Add Visa Service'}
        editFormTitle={'Edit Visa Service'}

        //header buttons drawer
        buttonTitle={'Add New Visa Service'}
        editButtonTitle={'Edit Visa Service'}

        // forms
        CreateForm={VisaServiceForm}
        EditForm={''}
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
