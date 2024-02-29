import React, { useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useTicketBookingColumns from 'src/common/materialTable/tableColumns/ticketBookingColumns'
//Forms
import TicketBookingForm from 'src/common/forms/booking/ticketBooking/TicketBookingForm'

// redux
import { fetchTicketBooking } from 'src/store'

const index = ({ apiData }) => {
  const columns = useTicketBookingColumns()

  return (
    <div>
      <MaterialTable
        api={'ticket-booking'}
        apiData={apiData}
        fetchData={fetchTicketBooking}
        stateSelector='ticketBooking'
        columns={columns}
        drawerProps={{
          formTitle: 'Create Ticket',
          editFormTitle: 'Edit Ticket',

          //header buttons drawer
          buttonTitle: 'Create Ticket',
          editButtonTitle: 'Edit Ticket',
          CreateForm: TicketBookingForm,
          EditForm: TicketBookingForm
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
