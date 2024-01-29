import React from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'

import useTableColumns from 'src/common/materialTable/tableColumns/passportColumns'

//Forms
import PassportForm from 'src/common/forms/booking/passport/PassportForm'
// import EditPassportForm from 'src/common/forms/booking/passport/EditPassportForm'

// redux
import { fetchData } from 'src/store/apps/booking/passport'

// Hooks imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const index = ({ apiData }) => {
  const columns = useTableColumns()
  const { settings, saveSettings } = useSettings()

  // console.log(apiData)

  return (
    <div>
      <MaterialTable
        api={'passports'}
        apiData={apiData}
        fetchData={fetchData}
        stateSelector='passport'
        columns={columns}
        settings={settings}
        drawerProps={{
          formTitle: 'Add Passport',
          editFormTitle: 'Edit Passport',
          buttonTitle: 'Add New Passport',
          editButtonTitle: 'Edit Passport',
          CreateForm: PassportForm,
          EditForm: PassportForm
        }}
      />
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/passports/card`)
  const apiData = res.data

  return {
    props: {
      apiData
    }
  }
}

export default index
