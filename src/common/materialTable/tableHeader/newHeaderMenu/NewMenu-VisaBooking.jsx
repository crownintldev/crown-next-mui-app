import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Icon from 'src/@core/components/icon';
import { Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import PassportUploadFile from 'src/common/forms/uploadFile/PassportUploadFile';
import CustomDialog from 'src/common/dialog/CustomDialog';
import { useForm, Controller } from 'react-hook-form';
//redux
import { useDispatch } from 'react-redux';
import { fetchVisaBooking } from 'src/store';
//
import { updateManyApi } from 'src/action/function';
import MuiTextAreaHookField from 'src/common/dataEntry/MuiTextAreaHookField';

const statusList = [
  'inprocess',
  'verification',
  'in Embassy',
  'approved',
  'returned',
  'cancelled',
  'delivered',
  'rejected',
  'trash'
];

const NewHeaderMenuVisaBooking = ({
  SetForm,
  toggleDrawer,
  selectedIds,
  toggle,
  removeSelection
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleStatus = (status) => {
    setDialogOpen(true);
    setDialogTitle(status);
  };
  const handleSingleDrawerForm = (Form, title) => {
    SetForm({ Form, title });
    toggleDrawer();
  };

  const openDialog = () => {
    let defaultValues = {
      visaBookingIds: selectedIds,
      status: dialogTitle,
      statusRemarks: ''
    };
    const {
      reset,
      control,
      setError,
      handleSubmit,
      setValue,
      getValues,
      watch,
      formState: { errors }
    } = useForm({
      defaultValues,
      mode: 'onChange'
    });
    let toggle = () => {
      reset();
      setDialogOpen(false);
    };
    const handleOnSubmit = async () => {
      setValue('status', dialogTitle);
      setValue('visaBookingIds', selectedIds);
      updateManyApi({
        data: getValues(),
        dispatch,
        toggle,
        reset,
        removeSelection,
        fetchData: fetchVisaBooking,
        completeApi: 'visa-booking/update'
      });
    };
    const handleClose = () => {
      reset();
      setDialogOpen(false);
    };
    let dialogContent = (
      <div>
        <MuiTextAreaHookField
          rows={4}
          control={control}
          name='statusRemarks'
          errors={errors}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            sx={{ mr: 3 }}
            onClick={handleOnSubmit}
          >
            Submit
          </Button>

          <Button variant='tonal' color='secondary' onClick={handleClose} sx={{ mr: 3 }}>
            Cancel
          </Button>
        </Box>
      </div>
    );
    return (
      <CustomDialog
        setDialogOpen={setDialogOpen}
        dialogOpen={dialogOpen}
        title={<span className='text-orange-500'>Remarks For {dialogTitle}</span>}
        body={dialogContent}
      />
    );
  };
  return (
    <>
      {openDialog()}
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
            icon='mdi:list-status'
            // color='#2b60fe'
          />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {selectedIds && selectedIds.length > 0 && (
            <div onClick={handleClose}>
              <div>
                {statusList.map((item) => {
                  return (
                    <MenuItem
                      onClick={() => handleStatus(item)}
                      sx={{
                        py: 0.2,
                        m: 0
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '1em',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Icon fontSize='0.8rem' />
                        {item}
                      </Box>
                    </MenuItem>
                  );
                })}
              </div>
            </div>
          )}
        </Menu>
      </Box>
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
              handleSingleDrawerForm(PassportUploadFile, 'Export Csv Upload Passport')
            }
          />
        </IconButton>
      </Box>
    </>
  );
};

export default NewHeaderMenuVisaBooking;
