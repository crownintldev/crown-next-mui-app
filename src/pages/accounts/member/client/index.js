import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useAgentAndClientColumns from 'src/common/materialTable/tableColumns/agentAndClient'

//Forms
import AgentandClientForm from 'src/common/forms/member/AgentandClientForm'

// redux
import { fetchClient } from 'src/store'

const index = ({ apiData }) => {
  const columns = useAgentAndClientColumns()

  return (
    <div>
      <MaterialTable
        api={'client'}
        apiData={apiData}
        fetchData={fetchClient}
        stateSelector='client'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Client',
          editFormTitle: 'Edit Client',

          //header buttons drawer
          buttonTitle: 'Add Client',
          editButtonTitle: 'Edit Client',
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
