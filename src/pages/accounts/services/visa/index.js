import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import useTableColumns from 'src/common/materialTable/tableColumns/VisaService'

//Forms
import VisaServiceForm from 'src/common/forms/services/visaService/VisaServiceForm'
import SupplierVisaForm from 'src/common/forms/supplier-visa-service/SupplierVisaForm'

// redux
import { fetchVisaService } from 'src/store'
//headerMenu
import { MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import Icon from 'src/@core/components/icon'
import FormDrawer from 'src/common/drawer/FormDrawer'

const index = ({ apiData }) => {
  const columns = useTableColumns()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  const [selectedIds, setSelectedIds] = useState('')
  const [removeSelection, setRemoveSelection] = useState({})
  const [Form, SetForm] = useState({
    Form: null
  })

  // let Form = null
 
  const formDrawer = () => {
   return <FormDrawer
      open={drawerOpen}
      toggle={toggleDrawer}
      drawerTitle={'Edit Supplier Service'}
      Form={Form.Form}
      stateSelector="visaService"
      anchor={'right'}
      _id={selectedIds[0] || ''}
      removeSelection={removeSelection.removeSelection || ''}
    />
  }
  const headerMenu = ({ selectedIds, handleClose, removeSelection }) => {
    setSelectedIds(selectedIds)
    const handleDrawer = () => {
      SetForm({ Form: SupplierVisaForm })
      setRemoveSelection({removeSelection})
      toggleDrawer()
    }
    return (
      <div>
        {selectedIds && selectedIds.length === 1 && (
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
                  Edit Sup Visa Service
                </Box>
              </MenuItem>
            </div>
          </div>
        )}
      </div>
    )
  }
  return (
    <div>
      {formDrawer()}
      <MaterialTable
        api={'visa-service'}
        apiData={apiData}
        fetchData={fetchVisaService}
        stateSelector='visaService'
        columns={columns}
        headerMenu={headerMenu}
        drawerProps={{
          formTitle: 'Visa Service',
          editFormTitle: 'Edit Visa Service',

          //header buttons drawer
          buttonTitle: 'Add Service',
          editButtonTitle: 'Edit Visa Service',
          CreateForm: SupplierVisaForm,
          EditForm: VisaServiceForm
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
