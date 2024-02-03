import React from 'react'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import { fetchInvoice } from 'src/store'
import useUserColumns from 'src/common/materialTable/tableColumns/authColumns'

const index = () => {
  
  const columns = useUserColumns()
  return (
    <div>
    Working on this
       {/* <MaterialTable
          api={'user'}
          fetchData={fetchInvoice}
          stateSelector='user'
          columns={columns}
          drawerProps={{
            editFormTitle: 'Edit User',
            //header buttons drawer
            editButtonTitle: 'Edit User',
            CreateForm: "",
            EditForm: "",
          }}
        /> */}
    </div>
  )
}

export default index