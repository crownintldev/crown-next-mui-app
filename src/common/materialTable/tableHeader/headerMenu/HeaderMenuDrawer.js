import React from 'react';
import FormDrawer from 'src/common/drawer/FormDrawer';

const HeaderMenuDrawer = ({
  drawerOpen,
  toggleDrawer,
  Form,
  FormTitle,
  selectedIds,
  removeSelection
}) => {
  const formDrawer = () => (
    <FormDrawer
      open={drawerOpen}
      toggle={toggleDrawer}
      drawerTitle={FormTitle ?? 'Form'}
      Form={Form}
      anchor={'right'}
      _id={selectedIds || ''}
      removeSelection={removeSelection || ''}
    />
  );
  return <>{open && formDrawer()}</>;
};

export default HeaderMenuDrawer;
