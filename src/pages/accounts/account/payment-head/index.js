import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import usePaymentHeadColumns from 'src/common/materialTable/tableColumns/paymentHeadColumns'
//Forms
import PaymentHeadForm from 'src/common/forms/paymentHead/PaymentHeadForm'
// redux
import { fetchPaymentHead } from 'src/store'

const index = ({ apiData }) => {
  const columns = usePaymentHeadColumns()

  return (
    <div>
      <MaterialTable
        api={'payment-head'}
        apiData={apiData}
        fetchData={fetchPaymentHead}
        stateSelector='paymentHead'
        columns={columns}
        drawerProps={{
          formTitle: 'Payment Head',
          editFormTitle: 'Edit Payment Head',

          //header buttons drawer
          buttonTitle: 'Payment Head',
          editButtonTitle: 'Edit Payment Head',
          CreateForm: PaymentHeadForm,
          EditForm: PaymentHeadForm
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
