// ** MUI Imports
import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Button } from '@mui/material'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const FormDrawer = ({
  open,
  toggle,
  drawerTitle,
  Form,
  _id,
  removeSelection,
  //for VisaService
  anchor = 'right',
  fetchApi,
  formName,
  api,
  stateSelector
}) => {
  const [formSize, setFormSize] = useState(400)
  return (
    <Drawer
      open={open}
      anchor={anchor}
      variant='temporary'
      onClose={toggle}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400, md: formSize } } }}
    >
      <Header>
        <Typography variant='h5'>{drawerTitle}</Typography>
        <IconButton
          size='small'
          onClick={toggle}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        {Form && (
          <Form
            toggle={toggle}
            _id={_id}
            removeSelection={removeSelection}
            fetchApi={fetchApi}
            formName={formName}
            api={api}
            stateSelector={stateSelector}
            setFormSize={setFormSize}
          />
        )}
      </Box>
    </Drawer>
  )
}

export default FormDrawer
