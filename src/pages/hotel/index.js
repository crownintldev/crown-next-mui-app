import React from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useHotelBookingColumns from 'src/common/materialTable/tableColumns/hotelBookingColumns'

//Forms
// import AgentandClientForm from 'src/common/forms/member/AgentandClientForm'
import HotelBookingForm from 'src/common/forms/hotel/HotelForm'

// import businessSettings from 'src/common/forms/businessSettings/companyForm'
import { reduxToken } from 'src/action/auth-action'
// redux
import { fetchHotelBooking } from 'src/store'

console.log(reduxToken())
const index = ({ apiData }) => {
  const columns = useHotelBookingColumns()

  return (
    <div>
      <MaterialTable
        api={'hotel-booking'}
        apiData={apiData}
        fetchData={fetchHotelBooking}
        stateSelector='hotelBooking'
        columns={columns}
        drawerProps={{
          formTitle: 'Add Hotel',
          editFormTitle: 'Edit Hotel',

          //header buttons drawer
          buttonTitle: 'Add Hotel',
          editButtonTitle: 'Edit Hotel',
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
