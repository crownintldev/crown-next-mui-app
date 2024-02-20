import React from 'react'
import FormDrawer from 'src/common/drawer/FormDrawer';

const HeaderMenuDrawer = ({drawerOpen,toggleDrawer,Form,selectedIds,removeSelection}) => {

    const formDrawer = () => (
        <FormDrawer
          open={drawerOpen}
          toggle={toggleDrawer}
          drawerTitle={'Edit Passport'}
          Form={Form}
          anchor={'right'}
          _id={selectedIds || ''}
          removeSelection={removeSelection || ''}
        />
      );
  return (
    <>{selectedIds.length>0 && formDrawer()}</>
  )
}

export default HeaderMenuDrawer