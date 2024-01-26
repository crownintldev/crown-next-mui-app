// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import ApexAreaChart from 'src/views/charts/apex-charts/ApexAreaChart'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ApexCharts = () => {
  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6} className='match-height'>
          <PageHeader
            title={
              <Typography variant='h4'>
                <LinkStyled href='https://github.com/apexcharts/react-apexcharts' target='_blank'>
                  React ApexCharts
                </LinkStyled>
              </Typography>
            }
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                React Component for ApexCharts
              </Typography>
            }
          />
          <Grid item xs={12}>
            <ApexAreaChart />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default ApexCharts
