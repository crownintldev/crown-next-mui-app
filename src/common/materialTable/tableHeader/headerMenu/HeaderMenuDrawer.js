import React from 'react';
import FormDrawer from 'src/common/drawer/FormDrawer';

const HeaderMenuDrawer = ({
  drawerOpen,
  toggleDrawer,
  Form,
  FormTitle,
  selectedIds,
  removeSelection,
  fetchData,
  api
}) => {
  const formDrawer = () => (
    <FormDrawer
      open={drawerOpen}
      toggle={toggleDrawer}
      drawerTitle={FormTitle ?? 'Form'}
      fetchApi={fetchData}
      Form={Form}
      anchor={'right'}
      _id={selectedIds || ''}
      api={api}
      removeSelection={removeSelection || ''}
    />
  );
  return <>{open && formDrawer()}</>;
};

export default HeaderMenuDrawer;
