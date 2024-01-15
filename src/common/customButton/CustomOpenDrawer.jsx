import React, { useState } from 'react';
import { Button, Box, MenuItem, Icon } from '@mui/material';
import FormDrawer from 'src/common/drawer/FormDrawer';

const CustomOpenDrawer = ({
  ButtonTitle,
  drawerTitle,
  Form,
  fetchApi,
  api,
  _id,
  removeSelection,
  anchor,
  component,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div>
      {component ? (
        <Box onClick={toggleDrawer}>{component}</Box>
      ) : (
        <Button onClick={toggleDrawer}>{ButtonTitle}</Button>
      )}

      <FormDrawer
        open={drawerOpen}
        toggle={toggleDrawer}
        drawerTitle={drawerTitle}
        Form={Form}
        anchor={anchor || 'left'}
        fetchApi={fetchApi}
        api={api}
        _id={_id || ''}
        removeSelection={removeSelection || ''}
      />
    </div>
  );
};

export default CustomOpenDrawer;
