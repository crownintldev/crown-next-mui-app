// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import AbilityProvider from './AbilityProvider'

const CanViewNavSectionTitle = props => {
  // ** Props
  const { children, navTitle } = props

  // ** Hook
  const ability = useContext(AbilityContext)
  if (navTitle && navTitle.auth === false) {
    return <>{children}</>
  } else {
    return ability && AbilityProvider(navTitle, 'CanViewNavSectionTitle') ? <>{children}</> : null
  }
}

export default CanViewNavSectionTitle
