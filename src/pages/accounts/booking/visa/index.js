import React, { useState, useEffect } from 'react'
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
import CustomOpenDrawer from 'src/common/customButton/CustomOpenDrawer'

// redux
import { fetchVisaBooking } from 'src/store'
import { ReduxFetchAndGet } from 'src/utils/ReduxFetchAndGet'
//headerMenu
import { MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import Icon from 'src/@core/components/icon'
import FormDrawer from 'src/common/drawer/FormDrawer'
import MediaDrawer from 'src/common/drawer/MediaDrawer'

const index = ({ apiData }) => {
  const openMediaDrawer = row => {
    console.log('original dat', row.original)
    setSelectedRowData(row.original)
    setMediaDrawerOpen(true)
  }

  const columns = useTableColumns(openMediaDrawer)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  const [selectedIds, setSelectedIds] = useState('')
  const [removeSelection, setRemoveSelection] = useState(null)
  const [showAddPassport, setShowAddPassport] = useState(true)
  const [mediaDrawerOpen, setMediaDrawerOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)

  const formDrawer = () => (
    <FormDrawer
      open={drawerOpen}
      toggle={toggleDrawer}
      drawerTitle={'Edit Passport'}
      Form={PassportForm}
      anchor={'right'}
      fetchApi={fetchVisaBooking}
      api={'visa-booking'}
      _id={selectedIds[0] || ''}
      removeSelection={removeSelection || ''}
    />
  )
  const headerMenu = ({ selectedIds, handleClose, removeSelection }) => {
    const handleDrawer = () => {
      setSelectedIds(selectedIds)
      setRemoveSelection(removeSelection)
      toggleDrawer()
    }
    const handleEditPassport = () => {
      setShowAddPassport(false) // Hide the "Add Passport" menu item
      handleDrawer()
    }
    return (
      <>
        {selectedIds && selectedIds.length === 1 && (
          <>
            <div onClick={handleClose}>
              <div onClick={toggleDrawer}>
                <MenuItem onClick={handleDrawer} sx={{ py: 1, m: 0 }}>
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
              </div>
            </div>
          </>
        )}
      </>
    )
  }
  return (
    <div>
      {formDrawer()}
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
      {mediaDrawerOpen && (
        <MediaDrawer
          open={mediaDrawerOpen}
          onClose={() => setMediaDrawerOpen(false)}
          data={
            [
              /* Pass your static data here */
            ]
          }
        />
      )}
    </div>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/visa-bookings/card`)
    const apiData = res.data

    return {
      props: {
        apiData
      }
    }
  } catch (err) {
    console.error(err.message)
    return {
      props: {
        apiData: []
      }
    }
  }
}

export default index
