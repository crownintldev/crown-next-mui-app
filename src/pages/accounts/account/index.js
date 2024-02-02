import React from 'react'
import axios from 'axios'
import GroupTable from 'src/common/materialTable/groupTable/GroupTable'
import {
  useTableColumns,
  useChildTableColumns
} from 'src/common/materialTable/tableColumns/accountColumns'

//Forms
import EditAccountForm from 'src/common/forms/account/EditAccountForm'

// redux
import { fetchData } from 'src/store/apps/account'
//
const index = ({ apiData }) => {
  const columns = useTableColumns()
  const childColumns = useChildTableColumns()
  //
  return (
    <div>
      <GroupTable
        api={'accounts'}
        //  apiData={apiData}
        columns={columns}
        childColumns={childColumns}
        fetchData={fetchData}
        stateSelector='account'
        drawerProps={{
          editFormTitle: 'Edit/Merge Account',

          //header buttons drawer
          editButtonTitle: 'Edit/Merge Account',

          // forms
          EditForm: EditAccountForm,
          multiSelected: true
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
