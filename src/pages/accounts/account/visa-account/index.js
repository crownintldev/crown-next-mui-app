import React, { useState } from 'react'
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
import MediaDrawer from 'src/common/drawer/MediaDrawer'
//
const index = ({ apiData }) => {
  // open media drawer handler
  const openMediaDrawer = (row) => {
    console.log('acc row data', row.original)
    setSelectedRowData(row.original)
    setMediaDrawerOpen(true)
  }

  const columns = useTableColumns(openMediaDrawer)
  const childColumns = useChildTableColumns()
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [mediaDrawerOpen, setMediaDrawerOpen] = useState(false)

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
          editFormTitle: 'Edit Account',
          //header buttons drawer
          editButtonTitle: 'Edit Account',
          // forms
          EditForm: EditAccountForm,
          multiSelected: true
        }}
      />
      {mediaDrawerOpen && (
        <MediaDrawer
          open={mediaDrawerOpen}
          onClose={() => setMediaDrawerOpen(false)}
          data={selectedRowData}
        />
      )}
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
