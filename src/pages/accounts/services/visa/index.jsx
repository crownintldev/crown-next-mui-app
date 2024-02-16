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
  const [removeSelection, setRemoveSelection] = useState(null)
  const [Form, SetForm] = useState({
    Form:null
  })

  // let Form = null
  const formDrawer = () => (
    <FormDrawer
      open={drawerOpen}
      toggle={toggleDrawer}
      drawerTitle={'Add Supplier Service'}
      Form={Form.Form}
      anchor={'right'}
      _id={selectedIds[0] || ''}
      removeSelection={removeSelection || ''}
    />
  )
  const headerMenu = ({ selectedIds, handleClose, removeSelection }) => {
    const handleDrawer = () => {
      SetForm({Form:SupplierVisaForm})
      setSelectedIds(selectedIds)
      setRemoveSelection(removeSelection)
      toggleDrawer()
    }
    return (
      
      <div onClick={handleDrawer}>
        <div onClick={handleClose}>
          <div>
            <MenuItem  sx={{ py: 1, m: 0 }}>
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
                Add Supplier
              </Box>
            </MenuItem>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      {formDrawer(Form)}
      <MaterialTable
        api={'visa-service'}
        apiData={apiData}
        fetchData={fetchVisaService}
        stateSelector='visaService'
        columns={columns}
        headerMenu={headerMenu}
        drawerProps={{
          formTitle: 'Visa Service Sale Rate',
          editFormTitle: 'Edit Visa Service Sale Rate',

          //header buttons drawer
          buttonTitle: 'Add New Visa Service',
          editButtonTitle: 'Edit Visa Service',
          CreateForm: VisaServiceForm,
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
