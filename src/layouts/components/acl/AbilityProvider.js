import React from 'react'
import { useContext } from 'react'
import { useAuth } from 'src/hooks/useAuth'
// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { hasAdministrativeManageAll } from 'src/utils/helperfunction'
const AbilityProvider = (item, ref) => {
  // ** Hook

  const auth = useAuth()
  const { user } = auth
  const ability = useContext(AbilityContext)

  // console.log('=====item user', user)
  if (hasAdministrativeManageAll(user, ability)) {
    return ability
  } else {
    if (user && user.modules.length > 0) {
      let hasAbility = false
      if (item && item?.key) {
        hasAbility = user.modules?.some(mod => mod.key === item?.key)
        // console.log('=====item mod', item, ref)
      } else {
        // console.log('=====item nav', item, ref)
      }
      // hasAbility = user.modules?.some(mod => mod.key === item?.key)

      if (hasAbility) {
        // console.log('===hasAbility', hasAbility)

        return ability
      } else {
        return false
      }
    }
  }
}

export default AbilityProvider
