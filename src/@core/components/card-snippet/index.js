// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ToggleButton from '@mui/material/ToggleButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import {
  Grid,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import Prism from 'prismjs'
import toast from 'react-hot-toast'

// ** Hooks
import useClipboard from 'src/@core/hooks/useClipboard'

const CardSnippet = props => {
  // ** Props
  const { id, sx, code, title, children, className } = props

  // ** States
  const [showCode, setShowCode] = useState(false)
  const [tabValue, setTabValue] = useState(code.tsx !== null ? 'tsx' : 'jsx')

  // ** Hooks
  const clipboard = useClipboard()
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  // ** Highlight code on mount
  useEffect(() => {
    Prism.highlightAll()
  }, [showCode, tabValue])

  const codeToCopy = () => {
    if (code.tsx !== null && tabValue === 'tsx') {
      return code.tsx.props.children.props.children
    } else if (code.jsx !== null && tabValue === 'jsx') {
      return code.jsx.props.children.props.children
    } else {
      return ''
    }
  }

  const handleClick = () => {
    clipboard.copy(codeToCopy())
    toast.success('The source code has been copied to your clipboard.', {
      duration: 2000
    })
  }

  const renderCode = () => {
    if (code[tabValue] !== null) {
      return code[tabValue]
    } else {
      return null
    }
  }

  return (
    <Card
      className={className}
      sx={{ '& .MuiCardHeader-action': { lineHeight: 0.8 }, ...sx }}
      id={id || `card-snippet--${title.toLowerCase().replace(/ /g, '-')}`}
    >
      <CardHeader title={title} {...(hidden ? {} : {})} />
      <Grid
        container
        justifyContent='space-between'
        paddingLeft={5}
        paddingRight={5}
        alignItems={'center'}
      >
        <Grid item>
          <Typography variant='h4'>Latest Offers and Deals</Typography>
        </Grid>
        <Grid item>
          {/* <InputLabel id='demo-simple-select-label'>Select from lists</InputLabel> */}
          <Autocomplete
            id='demo-simple-select'
            options={[
              { value: 10, label: 'Ten' },
              { value: 20, label: 'Twenty' },
              { value: 30, label: 'Thirty' },
              { value: 40, label: 'Forty' },
              { value: 50, label: 'Fifty' },
              { value: 60, label: 'Sixty' },
              { value: 70, label: 'Seventy' }
            ]}
            getOptionLabel={option => option.label}
            renderInput={params => <TextField {...params} label='Select from lists' />}
            sx={{ width: '15em' }}
          />
        </Grid>
      </Grid>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default CardSnippet
