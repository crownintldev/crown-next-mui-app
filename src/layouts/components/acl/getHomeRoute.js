import { useAuth } from 'src/hooks/useAuth'

/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = role => {
  if (role !== 'administrative' && role !== 'staff') return '/acl'
  else {
    if (role === 'administrative') {
      return '/home/dashboards/analytics/'
    } else {
      return '/home/dashboards/analytics/'
    }
  }
}

export default getHomeRoute
