import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import Icon from 'src/@core/components/icon';
import PaymentHeadForm from 'src/common/forms/subsidiary/subsidiaryForm';

const HeaderMenuAccount = ({
  SetForm,
  setSelectedIds,
  setRemoveSelection,
  toggleDrawer,
  selectedIds,
  handleClose,
  removeSelection
}) => {
  const headerMenu = () => {
    const handleSingleDrawerForm = (Form,title) => {
      if (setSelectedIds) {
        setSelectedIds(selectedIds[0]);
      }
      setRemoveSelection({ removeSelection });
      SetForm({ Form,title });
      toggleDrawer();
    };
    return (
      
      <>
        {selectedIds?.length > 0 && (
            <div onClick={handleInvoice}>
              <MenuItem
                onClose={handleClose}
                sx={{
                  py: 1,
                  m: 0
                }}
              >
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
                  Create Invoice
                </Box>
              </MenuItem>
            </div>
          )}
      </>
    );
  };

  return <>{headerMenu()}</>;
};

export default HeaderMenuAccount;
