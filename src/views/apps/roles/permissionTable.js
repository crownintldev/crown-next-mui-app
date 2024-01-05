import {
  Box,
  Checkbox,
  FormControlLabel,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const PermissionTable = ({ rolesArr, roleKey, setSelectedPermissions, selectedPermissions }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  console.log('====data selectedCheckbox', selectedCheckbox)
  console.log('====data selectedPermissions', selectedPermissions)
  const togglePermission = (permission, action, roleKey) => {
    // Find if the permission already exists in the array
    const permissionIndex = selectedCheckbox.findIndex(
      per => per.module === roleKey && per.permission === permission && per.action === action
    )
    let newPermissions
    if (permissionIndex > -1) {
      // Permission exists, remove it
      newPermissions = [
        ...selectedCheckbox.slice(0, permissionIndex),
        ...selectedCheckbox.slice(permissionIndex + 1)
      ]
    } else {
      // Permission does not exist, add it
      newPermissions = [...selectedCheckbox, { module: roleKey, permission, action }]
    }
    setSelectedCheckbox(newPermissions)
  }

  const handleSelectAllCheckbox = event => {
    if (event.target.checked) {
      // Define all actions
      const allActions = ['read', 'write', 'create']

      // Create a flattened array of all permission combinations
      let newPermissions = rolesArr.flatMap(role => {
        // const permission = role.name.toLowerCase().replace(/\s+/g, '-')
        const permissionId = role._id
        return allActions.map(action => ({
          module: roleKey._id,
          permission: permissionId,
          action: action
        }))
      })

      // Set the state with the new flattened array
      setSelectedCheckbox(newPermissions)
    } else {
      // Deselect all: Clear the selectedCheckbox state
      setSelectedCheckbox([])
      // setSelectedPermissions([])
    }
  }

  const isSelected = (roleKey, permission, action) => {
    return selectedCheckbox.some(
      per => per.module === roleKey && per.permission === permission && per.action === action
    )
  }

  const formatPermissions = selectedPermissions => {
    const formatted = {}

    selectedPermissions.forEach(({ module, permission, action }) => {
      // Create a unique key for each module-permission pair
      const key = `${module._id}-${permission}`

      if (!formatted[key]) {
        // Initialize if this module-permission pair doesn't exist
        formatted[key] = {
          module,
          permission,
          actions: []
        }
      }

      // Add the action to the actions array if it's not already present
      if (!formatted[key].actions.includes(action)) {
        formatted[key].actions.push(action)
      }
    })

    // Convert the object back to an array
    return Object.values(formatted)
  }

  useEffect(() => {
    let totalPermissions = rolesArr.length * 3 // Total possible permissions
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < totalPermissions) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  //set selected permission on module base
  useEffect(() => {
    const newFormattedPermissions = formatPermissions(selectedCheckbox)
    if (selectedCheckbox && selectedCheckbox.length > 0) {
      setSelectedPermissions(prev => ({ ...prev, [roleKey.key]: newFormattedPermissions }))
    } else {
      setSelectedPermissions(prev => ({ ...prev, [roleKey.key]: [] }))
    }
  }, [selectedCheckbox])
  return (
    <>
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
                      // checked={isAllSelected}
                    />
                  }
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rolesArr &&
              rolesArr.map((i, index) => {
                // const permission = i.name.toLowerCase().replace(/\s+/g, '-')
                const permissionId = i._id
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
                      {i.name}
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        label='Read'
                        sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                        control={
                          <Checkbox
                            size='small'
                            // id={`${id}-read`}
                            onChange={() => togglePermission(permissionId, 'read', roleKey._id)}
                            checked={isSelected(roleKey._id, permissionId, 'read')}
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
                            // id={`${id}-write`}
                            onChange={() => togglePermission(permissionId, 'write', roleKey._id)}
                            checked={isSelected(roleKey._id, permissionId, 'write')}
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
                            // id={`${id}-create`}
                            onChange={() => togglePermission(permissionId, 'create', roleKey._id)}
                            checked={isSelected(roleKey._id, permissionId, 'create')}
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
    </>
  )
}

export default PermissionTable
