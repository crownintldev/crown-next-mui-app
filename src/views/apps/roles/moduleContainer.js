// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Checkbox from '@mui/material/Checkbox'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import FormControlLabel from '@mui/material/FormControlLabel'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** action Imports
import { fetchData, fetchModules, fetchPermissionsWithId } from 'src/store/apps/permissions/index'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import RolesCards from './RoleCards'
import { Switch } from '@mui/material'
import PermissionTable from './permissionTable'

const ModuleContainer = ({ errors, setSelectedPermissions, selectedPermissions }) => {
  //**hooks */
  const dispatch = useDispatch()
  const crudProps = useSelector(state => state.permissions)
  const { success, modules } = crudProps
  const auth = useAuth()

  const [expanded, setExpanded] = useState(false)
  const [tableSwitch, setTableSwitch] = useState([])
  const [module, setModule] = useState()
  const [permissionsData, setPermissionsData] = useState({})

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const fetchPermissionsForRole = async module => {
    console.log('===event module', module)
    setModule(module)
    const data = {
      module: module._id
    }
    await dispatch(fetchPermissionsWithId({ data, token: auth.user.token, recordName: module.key }))
  }

  const handleSwitchChange = async itemKey => {
    setTableSwitch(prevState => {
      const newState = [...prevState]
      const index = newState.findIndex(key => key === itemKey._id)

      if (index > -1) {
        // Key exists - remove it
        newState.splice(index, 1)
      } else {
        // Key doesn't exist - add it and call API
        newState.push(itemKey._id)

        // Perform the API call here
        // Assuming you have a function to call your API
        fetchPermissionsForRole(itemKey)
      }

      return newState
    })
  }

  // const fetchDetails = async () => {
  //   const responseAction = await dispatch(
  //     fetchData({ query: { query: 'all' }, token: auth.user.token })
  //   )
  // }
  // console.log('===responseAction', auth.user)
  useEffect(() => {
    setPermissionsData(prev => ({
      ...prev,
      [module && module.key]: crudProps && crudProps[module && module.key]
    }))
  }, [module, crudProps])

  useEffect(() => {
    const data = {
      query: 'all'
      // Include other properties as needed
    }
    dispatch(fetchModules({ data, token: auth.user.token, recordName: 'modules' }))
  }, [])
  return (
    <div>
      {modules
        ? modules.map((item, index) => {
            return (
              <Accordion expanded={expanded === item.key} onChange={handleChange(item.key)}>
                <AccordionSummary
                  id=''
                  aria-controls=''
                  expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
                >
                  <FormControlLabel
                    // label={}
                    aria-label=''
                    control={<Switch disableRipple checked={tableSwitch.includes(item._id)} />}
                    onClick={event => {
                      event.stopPropagation() // Stop the event from reaching the accordion
                      handleSwitchChange({
                        key: item.key,
                        _id: item._id
                      }) // Update the state
                    }}
                    onFocus={event => event.stopPropagation()}
                  />
                  <Typography
                    sx={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}
                  >{`${item.title} (${
                    (tableSwitch.includes(item._id) &&
                      permissionsData &&
                      permissionsData[item.key] &&
                      permissionsData[item.key].length) ||
                    0
                  })`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {permissionsData[item.key] && tableSwitch.includes(item._id) ? (
                    <PermissionTable
                      errors={errors}
                      roleKey={{ _id: item._id, key: item.key }}
                      rolesArr={permissionsData[item.key] ? permissionsData[item.key] : []}
                      selectedPermissions={selectedPermissions}
                      setSelectedPermissions={setSelectedPermissions}
                    />
                  ) : (
                    <Typography>Enable Permission</Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            )
          })
        : 'loading...'}
    </div>
  )
}

export default ModuleContainer
