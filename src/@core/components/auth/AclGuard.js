// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'
import DialogCreateApp from 'src/pages/createApp'
import { useSettings } from 'src/@core/hooks/useSettings'
import { subject } from '@casl/ability'

function determineModuleKey(router) {
  // Example: determine the module key from the request
  // Modify this logic based on how your modules are defined in the request
  if (router.route.includes('/accounts')) {
    return 'accountsapp'
  }
  if (router.route.includes('/home')) {
    return 'accountsapp'
  }

  return '' // Fallback module key
}
const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  const { settings, saveSettings } = useSettings()
  const { createAppModal } = settings
  // ** Vars
  let ability
  const moduleKey = determineModuleKey(router)
  const subjectType = subject('All', {
    module: moduleKey
  })

  useEffect(() => {
    if (auth.user && auth.user.accountType && !guestGuard && router.route === '/') {
      const homeRoute = getHomeRoute(auth.user.accountType)
      if (auth.user && auth.user.accountSetupStatus === 'pending') {
        saveSettings({ ...settings, createAppModal: true })
        // router.replace('/createApp')
        router.replace(homeRoute)
      } else if (auth.user && auth.user.accountSetupStatus === 'completed') {
        saveSettings({ ...settings, createAppModal: false })
        router.replace(homeRoute)
      }
      // const homeRoute = getHomeRoute(auth.user.role)
      // router.replace(homeRoute)
    }
  }, [auth.user, guestGuard, router.route, createAppModal])

  // User is logged in, build ability for the user based on his role
  if (auth.user && !ability) {
    ability = buildAbilityFor(auth && auth.user)
    if (router.route === '/') {
      return <Spinner />
    }
  }
  // If guest guard or no guard is true or any error page
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }

  // Check the access of current user and render pages
  if (ability && auth.user) {
    if (router.route === '/') {
      return <Spinner />
    }
    console.log('== AbilityContext ==', ability.rules)
    return (
      <>
        <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
        <DialogCreateApp />
      </>
    )
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
