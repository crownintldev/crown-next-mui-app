// ** React Imports
import { useState, forwardRef } from 'react';

// ** NEXT js imports
import Image from 'next/image';

// ** MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';

// ** Third Party Imports
import DatePicker from 'react-datepicker';
import DatePickerField from 'src/common/dataEntry/DatePicker';
// ** Configs
import themeConfig from 'src/configs/themeConfig';

// ** Custom Component Imports
import CustomTextField from 'src/@core/components/mui/text-field';

const CustomInput = forwardRef(({ ...props }, ref) => {
  return (
    <CustomTextField
      fullWidth
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' } }}
      {...props}
    />
  );
});

const AddCardHeader = ({ invoiceNumber, cardHeader }) => {
  const { issueDate, setIssueDate, dueDate, setDueDate, detail } = cardHeader;
  // ** Hook
  const theme = useTheme();
  // console.log('header', detail.logo.url);
  // console.log(detail)
  return (
    <Grid container xl={{ mb: 10 }} xs={{ mb: 10 }} sx={{ mb: 10 }}>
      <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
            <Image src={detail?.logo} alt='business logo' width={70} height={70} />
            <Typography
              variant='h4'
              sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}
            >
              {detail?.businessName}
            </Typography>
          </Box>
          <div>
            <Typography sx={{ mb: 2, color: 'text.secondary', maxWidth: '20em' }}>
              {detail.address}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{detail.contacts}</Typography>
          </div>
        </Box>
      </Grid>
      <Grid item xl={6} xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xl: 'flex-end', xs: 'flex-start' }
          }}
        >
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h4' sx={{ mr: 2, width: '105px' }}>
              Invoice
            </Typography>
            <CustomTextField
              fullWidth
              value={invoiceNumber}
              sx={{ width: { sm: '250px', xs: '170px' } }}
              InputProps={{
                disabled: true,
                startAdornment: <InputAdornment position='start'>#</InputAdornment>
              }}
            />
          </Box>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>
              Date Issued:
            </Typography>
            <DatePickerField value={issueDate} onChange={(date) => setIssueDate(date)} />
            {/* <DatePicker
              id='issue-date'
              selected={issueDate}
              customInput={<CustomInput />}
              onChange={(date) => setIssueDate(date)}
            /> */}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>
              Date Due:
            </Typography>
            <DatePickerField value={dueDate} onChange={(date) => setDueDate(date)} />
            {/* <DatePicker
              id='due-date'
              selected={dueDate}
              customInput={<CustomInput />}
              onChange={(date) => setDueDate(date)}
            /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddCardHeader;
