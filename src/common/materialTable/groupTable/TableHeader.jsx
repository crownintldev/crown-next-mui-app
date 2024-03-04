// ** MUI Imports
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import toast from 'react-hot-toast';
import { IconButton, Menu, MenuItem } from '@mui/material';

// import { mdiCallToAction } from '@mdi/js';
import Button from '@mui/material/Button';

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field';
import Icon from 'src/@core/components/icon';
import { useDispatch, useSelector } from 'react-redux';

// import { setInvoice } from 'src/store/apps/myInvoice'
import { axiosErrorMessage } from 'src/utils/helperfunction';
import ExportButton from '../tableHeader/ExportButton';
import { getReducer } from 'src/store/apps/sliceActionReducer';
import { getCookie } from 'src/action/auth-action';

const accessToken = getCookie('jwt');
const TableHeader = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const setInvoice = getReducer('myInvoice');

  // useSelector
  const accountData = useSelector((state) => state.account.data);

  const data = useSelector((state) => state?.myInvoice?.data);

  // ** Props
  const {
    toggle,
    buttonTitle,
    fetchData,
    setChildRowSelection,
    selectedIds,
    api,
    table,
    tableData,
    childTable,
    removeSelection,
    headerMenu,
    NewHeaderMenu
  } = props;

  // console.log(selectedIds)
  const { visaBookingIds, accountId } = childTable;
  const ejectValue = { visaBookingIds, accountId };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInvoice = () => {
    const invoiceValues = selectedIds.map(
      (id) => accountData?.length > 0 && accountData.find((item) => item._id === id)
    );
    dispatch(setInvoice(invoiceValues));
    router.push('/accounts/invoice/add/');
    handleClose();
  };

  const handleEject = async () => {
    try {
      const isConfirmed = window.confirm(
        'Are you sure you want to eject, Paid and Discount will be 0 after this?'
      );

      if (isConfirmed) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/account/eject`,
          ejectValue,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        if (response.data) {
          dispatch(
            fetchData({
              limit: 20,
              page: 1
            })
          );
          setChildRowSelection({});
          toast.success('Eject Successfully', { position: 'top-center' });
        }
      }
    } catch (error) {
      console.log(axiosErrorMessage(error));
      toast.error(axiosErrorMessage(error), { position: 'top-center' });
    }
  };

  return (
    <Box style={{ display: 'flex' }}>
      <Box
        sx={{
          rowGap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <IconButton onClick={handleClick}>
          <Icon fontSize='1.5rem' icon='mdi:call-to-action' color='#2b60fe' />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {buttonTitle && (
            <div onClick={handleClose}>
              <MenuItem
                onClick={toggle}
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
                  <div>{buttonTitle}</div>
                </Box>
              </MenuItem>
            </div>
          )}
          {/* {ejectValue.visaBookingIds.length > 0 && (
            <MenuItem onClick={handleClose}>
              <Button onClick={handleEject} color='error' size='small'>
                <Icon fontSize='1.125rem' icon='tabler:minus' />
                Eject Passport
              </Button>
            </MenuItem>
          )} */}
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
          {headerMenu &&
            headerMenu({ selectedIds, handleClose, toggle, removeSelection })}
        </Menu>
        {/* ----------Export data--------- */}
        <ExportButton table={table} tableData={tableData} />
        {NewHeaderMenu && NewHeaderMenu({ selectedIds, toggle, removeSelection })}
      </Box>
    </Box>
  );
};

export default TableHeader;
