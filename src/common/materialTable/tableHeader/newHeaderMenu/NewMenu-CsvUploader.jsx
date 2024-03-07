import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Icon from 'src/@core/components/icon';
import { IconButton, Menu, MenuItem } from '@mui/material';
import UploadFile from 'src/common/forms/uploadFile/UploadFile';
import { useDispatch } from 'react-redux';

const NewMenuCsvUploader = ({ SetForm, toggleDrawer }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSingleDrawerForm = (Form, title) => {
    SetForm({ Form, title });
    toggleDrawer();
  };
  return (
    <>
      <Box
        sx={{
          rowGap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <IconButton onClick={handleClick}>
          <Icon
            fontSize='1.5rem'
            icon='material-symbols:upload'
            onClick={() =>
              handleSingleDrawerForm(UploadFile, 'Export Csv Upload Passport')
            }
          />
        </IconButton>
      </Box>
    </>
  );
};

export default NewMenuCsvUploader;
