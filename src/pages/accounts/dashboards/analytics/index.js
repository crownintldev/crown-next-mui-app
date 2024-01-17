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
import { InputLabel, Select, MenuItem } from '@mui/material'

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
        <Grid item xs={12}>
          <CardSnippet
            title='Latest Offers and Deals '
            code={{
              tsx: null,
              jsx: source.SwiperDefaultJSXCode
            }}
          >
            <Grid>
              <InputLabel id='demo-simple-select-label'>Age</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={age}
                label='Age'
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
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
