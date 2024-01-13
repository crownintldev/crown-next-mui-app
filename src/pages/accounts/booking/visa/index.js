import React, { useEffect } from 'react'
import axios from 'axios'
import DataTable from 'src/common/table/DataTable'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import { useMemo } from 'react'
import { columnData } from 'src/common/table/columnDataFunction'
import CustomChip from 'src/@core/components/mui/chip'
import useTableColumns from 'src/common/materialTable/tableColumns/visaBookingColumns'

//Forms
import EditVisaBookingForm from 'src/common/forms/booking/visaBooking/EditVisaBookingForm'
import PassportForm from 'src/common/forms/booking/passport/PassportForm'
import EditPassportForm from 'src/common/forms/booking/passport/EditPassportForm'

// redux
import { fetchVisaBooking } from 'src/store'
import { ReduxFetchAndGet } from 'src/utils/ReduxFetchAndGet'
import { Box, Icon, MenuItem, Typography } from '@mui/material'

const index = ({ apiData }) => {
  const columns = useTableColumns()

 const headerMenu = ({selectedIds,removeSelection}) => {
    return (
      <>
        <MenuItem sx={{ py: 1, m: 0 }}>
          <Box
            sx={{
              fontSize: '0.8em',
              display: 'flex',
              alignItems: 'center',
              columnGap: '4px',
              color: '#2b60fe'
            }}
          >
            <Icon fontSize='0.8rem' icon='tabler:plus' />
            Edit Passport Booking
          </Box>
        </MenuItem>
      </>
    )
  }
  return (
    <div>
      <MaterialTable
        api={'visa-booking'}
        apiData={apiData}
        fetchData={fetchVisaBooking}
        stateSelector='visaBooking'
        columns={columns}
        headerMenu={headerMenu}
        drawerProps={{
          formTitle: 'Add Passport',
          buttonTitle: 'Add Passport',
          editFormTitle: 'Edit Visa Booking',
          editButtonTitle: 'Edit Visa Booking',
          CreateForm: PassportForm,
          EditForm: EditVisaBookingForm,
          multiSelected: true
        }}
      />
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/visa-bookings/card`)
  const apiData = res.data

  return {
    props: {
      apiData
    }
  }
}

export default index
