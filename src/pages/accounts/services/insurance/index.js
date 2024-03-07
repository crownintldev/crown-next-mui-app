import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
//Forms
import InsuranceForm from 'src/common/forms/insurance/InsuranceForm'

// redux
import { fetchInsurance, fetchTicketBooking } from 'src/store'
import useInsuranceColumns from 'src/common/materialTable/tableColumns/insuranceColumns'

const index = ({ apiData }) => {
  const columns = useInsuranceColumns()

  return (
    <div>
      <MaterialTable
        api={'insurance'}
        apiData={apiData}
        fetchData={fetchInsurance}
        stateSelector='insurance'
        columns={columns}
        drawerProps={{
          formTitle: 'Create Insurance',
          editFormTitle: 'Edit Insurance',

          //header buttons drawer
          buttonTitle: 'Create Insurance',
          editButtonTitle: 'Edit Insurance',
          CreateForm: InsuranceForm,
          EditForm: InsuranceForm
        }}
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
