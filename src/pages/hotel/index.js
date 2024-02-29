import React from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useBusinessSettingColumns from 'src/common/materialTable/tableColumns/companyBusinessSetting'
//Forms
// import AgentandClientForm from 'src/common/forms/member/AgentandClientForm'
import HotelBookingForm from 'src/common/forms/hotel/HotelForm'

// import businessSettings from 'src/common/forms/businessSettings/companyForm'
import { reduxToken } from 'src/action/auth-action'
// redux
import { fetchHotelBooking } from 'src/store'

console.log(reduxToken())
const index = ({ apiData }) => {
  const columns = useBusinessSettingColumns()

  return (
    <div>
      <MaterialTable
        api={'hotelbooking'}
        apiData={apiData}
        fetchData={fetchHotelBooking}
        stateSelector='hotelbooking'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Business',
          editFormTitle: 'Edit Business',

          //header buttons drawer
          buttonTitle: 'Add Business',
          editButtonTitle: 'Edit Business',
          CreateForm: HotelBookingForm,
          EditForm: HotelBookingForm
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
