// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import AbilityProvider from './AbilityProvider'

const CanViewNavLink = props => {
  // ** Props
  const { children, navLink } = props
  // console.log('====nav==', navLink)
  // ** Hook
  const ability = useContext(AbilityContext)
  if (navLink && navLink.auth === false) {
    return <>{children}</>
  } else {
    return ability && AbilityProvider(navLink, 'CanViewNavLink') ? <>{children}</> : null
  }
}

export default CanViewNavLink
