// ** Icon Imports
import { Icon } from '@iconify/react'

const IconifyIcon = ({ icon, fontSize, ...rest }) => {
  return <Icon icon={icon} fontSize={fontSize || '1.375rem'} {...rest} />
}

export default IconifyIcon
