import React, { useState } from 'react'
import { Button } from '@mui/material'
import FormDrawer from 'src/common/drawer/FormDrawer'

const CustomOpenButtonForm = ({ ButtonTitle, drawerTitle, Form, fetchApi,formName,api }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  return (
    <div>
      <Button onClick={() => setDrawerOpen(true)}>{ButtonTitle}</Button>
      <FormDrawer
        open={drawerOpen}
        toggle={toggleDrawer}
        drawerTitle={drawerTitle}
        Form={Form}
        anchor='left'
        fetchApi={fetchApi}
        formName={formName}
        api={api}
      />
    </div>
  )
}

export default CustomOpenButtonForm
