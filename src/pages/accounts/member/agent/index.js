import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useAgentAndClientColumns from 'src/common/materialTable/tableColumns/agentAndClient'
import { store } from 'src/store'
//Forms
import AgentandClientForm from 'src/common/forms/member/AgentandClientForm'
import { reduxToken } from 'src/action/auth-action'
// redux
import { fetchAgent } from 'src/store'
console.log(reduxToken())
const index = ({ apiData }) => {
  const columns = useAgentAndClientColumns()
  return (
    <div>
      <MaterialTable
        api={'agent'}
        apiData={apiData}
        fetchData={fetchAgent}
        stateSelector='agent'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Agent',
          editFormTitle: 'Edit Agent',

          //header buttons drawer
          buttonTitle: 'Add Agent',
          editButtonTitle: 'Edit Agent',
          CreateForm: AgentandClientForm,
          EditForm: AgentandClientForm
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
