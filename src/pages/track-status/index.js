// React Imports
import * as React from 'react'
import { useState } from 'react'

// Next Imports

// MUI Imports
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import NoDataIcon from '@mui/icons-material/SearchOff'
import { Link } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const staticData = ['pakistan visa', 'Afghan visa', 'turki visa', 'canada visa', 'japan visa']
const TrackStatus = () => {
  const [searchText, setSearchText] = useState()
  const [results, setResults] = useState([])

  const handleSearch = event => {
    const value = event.target.value
    setSearchText(value)

    if (value) {
      const filteredResults = staticData.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      )
      setResults(filteredResults)
    } else {
      setResults([])
    }
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'center',
        margin: '50px',
        flexDirection: 'column'
      }}
    >
      <h2>Status Tracking</h2>
      <Paper
        component='form'
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <IconButton sx={{ p: '10px' }} aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Track Your Status ...'
          inputProps={{ 'aria-label': 'track your status ...' }}
          value={searchText}
          onChange={handleSearch}
        />
        <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
      {searchText && (
        <Box sx={{ mt: 4, width: '100%' }}>
          {results.length > 0
            ? results.map((result, index) => (
                <Typography key={index} variant='subtitle1' sx={{ textAlign: 'center' }}>
                  {result}
                </Typography>
              ))
            : searchText && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <NoDataIcon sx={{ fontSize: 60 }} />
                  <Typography>No data found, use valid data</Typography>
                </Box>
              )}
        </Box>
      )}
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg': { mr: 1 }
        }}
      >
        <Link href='/login' sx={{ display: 'flex', margin: '15px' }}>
          <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
          <span>Back to login</span>
        </Link>
      </Typography>
    </Box>
  )
}

TrackStatus.getLayout = page => <BlankLayout>{page}</BlankLayout>
TrackStatus.guestGuard = true

export default TrackStatus
