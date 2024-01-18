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
import CrmEarningReportsWithTabs from 'src/pages/components/earning-reports/CrmEarningReportsWithTabs'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

// ** Source code imports
import * as source from 'src/views/components/swiper/SwiperSourceCode'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
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
        <CrmEarningReportsWithTabs />
      </Grid>
    </KeenSliderWrapper>
  )
}

export default Swiper
