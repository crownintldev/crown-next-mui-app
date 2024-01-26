// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import CardSnippet from 'src/@core/components/card-snippet'

// ** Demo Components Imports
import SwiperDefault from 'src/views/components/swiper/SwiperDefault'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

// ** Source code imports
import * as source from 'src/views/components/swiper/SwiperSourceCode'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
// import EarningReportsWithTabs from 'src/common/analytics/charts/multiTabs-barchart/EarningReportsWithTabs'
import ApexAreaChart from 'src/common/analytics/charts/apex-charts'

const Swiper = () => {
  // ** Hook
  const {
    settings: { direction }
  } = useSettings()

  return (
    <KeenSliderWrapper>
      <Grid item xs={12} lg={8}>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <CardSnippet
              title=''
              code={{
                tsx: null,
                jsx: source.SwiperDefaultJSXCode
              }}
            >
              <SwiperDefault direction={direction} />
            </CardSnippet>
          </Grid>
        </Grid>
        {/* <EarningReportsWithTabs /> */}
        <ApexAreaChart />
      </Grid>
    </KeenSliderWrapper>
  )
}

export default Swiper
