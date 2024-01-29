import React, { useState,useEffect } from 'react'
// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import SelectField from 'src/common/dataEntry/SelectField'
import { useSelector } from 'react-redux'

const DialogModal = ({open,setOpen}) => {
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
    useEffect(() => {
        if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
          setIsIndeterminateCheckbox(true)
        } else {
          setIsIndeterminateCheckbox(false)
        }
      }, [selectedCheckbox])

      const rolesArr = [
        'User Management',
        'Content Management',
        'Disputes Management',
        'Database Management',
        'Financial Management',
        'Reporting',
        'API Control',
        'Repository Management',
        'Payroll'
      ]

      const handleClose = () => {
        setOpen(false)
        setSelectedCheckbox([])
        setIsIndeterminateCheckbox(false)
      }
    
      const togglePermission = id => {
        const arr = selectedCheckbox
        if (selectedCheckbox.includes(id)) {
          arr.splice(arr.indexOf(id), 1)
          setSelectedCheckbox([...arr])
        } else {
          arr.push(id)
          setSelectedCheckbox([...arr])
        }
      }
    
      const handleSelectAllCheckbox = () => {
        if (isIndeterminateCheckbox) {
          setSelectedCheckbox([])
        } else {
          rolesArr.forEach(row => {
            const id = row.toLowerCase().split(' ').join('-')
            togglePermission(`${id}-read`)
            togglePermission(`${id}-write`)
            togglePermission(`${id}-create`)
          })
        }
      }
    
  return (
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle
          component='div'
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h3'>{`Assign Role`}</Typography>
          <Typography color='text.secondary'>Assign Role Permissions</Typography>
        </DialogTitle>
      
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <SelectField
          options={['Account', 'Tickets', 'Hotel']}
          label='Select App'
          placeholder={'Select Payment Method'}
          // value={selectApp}
          // setValue={setSelectApp}
          disableClearable={true}
        />
          <Box sx={{ my: 4 }}>
            <FormControl fullWidth>
              <CustomTextField fullWidth label='Role Name' placeholder='Enter Role Name' />
            </FormControl>
          </Box>
          <Typography variant='h4'>Role Permissions</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        alignItems: 'center',
                        textTransform: 'capitalize',
                        '& svg': { ml: 1, cursor: 'pointer' },
                        color: theme => theme.palette.text.secondary,
                        fontSize: theme => theme.typography.h6.fontSize
                      }}
                    >
                      Administrator Access
                      <Tooltip placement='top' title='Allows a full access to the system'>
                        <Box sx={{ display: 'flex' }}>
                          <Icon icon='tabler:info-circle' fontSize='1.25rem' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControlLabel
                      label='Select All'
                      sx={{
                        '& .MuiTypography-root': {
                          textTransform: 'capitalize',
                          color: 'text.secondary'
                        }
                      }}
                      control={
                        <Checkbox
                          size='small'
                          onChange={handleSelectAllCheckbox}
                          indeterminate={isIndeterminateCheckbox}
                          checked={selectedCheckbox.length === rolesArr.length * 3}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rolesArr.map((i, index) => {
                  const id = i.toLowerCase().split(' ').join('-')

                  return (
                    <TableRow
                      key={index}
                      sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          fontSize: theme => theme.typography.h6.fontSize
                        }}
                      >
                        {i}
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Read'
                          sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size='small'
                              id={`${id}-read`}
                              onChange={() => togglePermission(`${id}-read`)}
                              checked={selectedCheckbox.includes(`${id}-read`)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Write'
                          sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size='small'
                              id={`${id}-write`}
                              onChange={() => togglePermission(`${id}-write`)}
                              checked={selectedCheckbox.includes(`${id}-write`)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Create'
                          sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size='small'
                              id={`${id}-create`}
                              onChange={() => togglePermission(`${id}-create`)}
                              checked={selectedCheckbox.includes(`${id}-create`)}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <Button type='submit' variant='contained' onClick={handleClose}>
              Submit
            </Button>
            <Button color='secondary' variant='tonal' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
  )
}

export default DialogModal