// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import AbilityProvider from './AbilityProvider'

const CanViewNavApp = props => {
  // ** Props
  const { children, navLink } = props
  // console.log('====nav==', navLink)
  // ** Hook
  const ability = useContext(AbilityContext)
  // console.log('====nav ability==', ability.rules)
  if (navLink && navLink.auth === false) {
    return <>{children}</>
  } else {
    return ability && AbilityProvider(navLink, 'CanViewNavApp') ? <>{children}</> : null
    // return ability ? <>{children}</> : null
  }
}

export default CanViewNavApp
