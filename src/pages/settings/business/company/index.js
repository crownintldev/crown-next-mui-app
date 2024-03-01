import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useBusinessSettingColumns from 'src/common/materialTable/tableColumns/companyBusinessSetting'
import { store } from 'src/store'
//Forms
// import AgentandClientForm from 'src/common/forms/member/AgentandClientForm'
import CompanyForm from 'src/common/forms/member/CompanyForm'
import businessSettingForm from 'src/common/forms/businessSettings/BusinessSettingForm'


// import businessSettings from 'src/common/forms/businessSettings/companyForm'
import { reduxToken } from 'src/action/auth-action'
// redux
import { fetchAgent } from 'src/store'
import { fetchBusinesssetting } from 'src/store'
import { useSelector } from 'react-redux'

const index = ({ apiData }) => {
  const columns = useBusinessSettingColumns()

  return (
    <div>
      <MaterialTable
        api={'business-setting'}
        apiData={apiData}
        fetchData={fetchBusinesssetting}
        stateSelector='businessSetting'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Business',
          editFormTitle: 'Edit Business',

          //header buttons drawer
          buttonTitle: 'Add Business',
          editButtonTitle: 'Edit Business',
          CreateForm: businessSettingForm,
          EditForm: businessSettingForm
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
