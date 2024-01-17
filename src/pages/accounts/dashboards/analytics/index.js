// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Demo Components Imports
import SwiperDefault from 'src/views/components/swiper/SwiperDefault'
import CrmEarningReportsWithTabs from '../crm/CrmEarningReportsWithTabs'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

// ** Source code imports
import * as source from 'src/views/components/swiper/SwiperSourceCode'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Swiper = () => {
  // ** Hook
  const {
    settings: { direction }
  } = useSettings()

  return (
    <KeenSliderWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          subtitle={
            <Typography sx={{ color: 'text.secondary' }}>
              Check the account main section for notifications, and much more
            </Typography>
          }
          title={
            <Typography variant='h4'>
              <LinkStyled href='https://github.com/rcbyr/keen-slider' target='_blank'>
                Latest Notifications
              </LinkStyled>
            </Typography>
          }
        />
        <Grid item xs={12}>
          <CardSnippet
            title='Swape the cursor right to left'
            code={{
              tsx: null,
              jsx: source.SwiperDefaultJSXCode
            }}
          >
            <SwiperDefault direction={direction} />
          </CardSnippet>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8}>
        <CrmEarningReportsWithTabs />
      </Grid>
    </KeenSliderWrapper>
  )
}

export default Swiper
