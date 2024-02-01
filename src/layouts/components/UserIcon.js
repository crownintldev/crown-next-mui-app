// ** Custom Icon Import
import MouseOverPopover from 'src/@core/components/MouseOverPopover'
import Icon from 'src/@core/components/icon'

const UserIcon = ({ icon, popover, popoverText, fontSize, ...rest }) => {
  return (
    <>
      {popover && popoverText !== undefined ? (
        <MouseOverPopover text={popoverText}>
          <Icon icon={icon} {...rest} fontSize={fontSize} />
        </MouseOverPopover>
      ) : (
        <Icon icon={icon} {...rest} />
      )}
    </>
  )
}

export default UserIcon
