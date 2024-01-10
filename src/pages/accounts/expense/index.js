import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useExpenseColumns from 'src/common/materialTable/tableColumns/expenseColumns'

//Forms
import ExpenseForm from 'src/common/forms/expense/ExpenseForm'

// redux
import { fetchExpense } from 'src/store'

const index = ({ apiData }) => {
  const columns = useExpenseColumns()
  
return (
    <div>
      <MaterialTable
        api={'expense'}
        apiData={apiData}
        fetchData={fetchExpense}
        stateSelector='expense'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Expense',
          editFormTitle: 'Edit Expense',

          //header buttons drawer
          buttonTitle: 'Add Expense',
          editButtonTitle: 'Edit Expense',
          CreateForm: ExpenseForm,
          EditForm: ExpenseForm,
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
