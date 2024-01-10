// ** Custom Menu Components

import VerticalNavAppLink from './VerticalNavAppLink'

// const resolveNavItemComponent = item => {
//   if (item.sectionTitle) return VerticalNavSectionTitle
//   if (item.children) return VerticalNavGroup

//   return VerticalNavLink
// }

const resolveNavItemComponent = item => {
  return VerticalNavAppLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
