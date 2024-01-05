import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
// const defineRulesFor = user => {
//   const { can, rules } = new AbilityBuilder(AppAbility)
//   if (role === 'administrative') {
//     can('manage', 'all')
//   } else if (role === 'staff') {
//     user.permiss
//   } else {
//     can('read', 'ALL')
//   }

//   return rules
// }
const defineRulesFor = user => {
  const { can, rules, build } = new AbilityBuilder(AppAbility)
  if (user.accountType === 'administrative') {
    let hasAdministrativeManageAll = user.permissionsDetails?.some(
      permissionDetail =>
        permissionDetail.permission === 'administrative' &&
        permissionDetail.actions?.includes('manageAll')
    )
    if (hasAdministrativeManageAll) {
      can('manageAll', 'administrative', {
        module: 'all'
      })
    }
  } else if (user.accountType === 'staff') {
    user.permissionsDetails.length > 0 &&
      user.permissionsDetails.forEach(permissionDetail => {
        if (Array.isArray(permissionDetail.actions)) {
          permissionDetail.actions.forEach(action => {
            can(action, permissionDetail.permission, {
              module: permissionDetail.module
            })
          })
        }
      })

    // Define abilities based on permissions and modules
    // user.permissionsDetails.forEach((permission) => {
    //   can(permission.action, permission.subject, {
    //     module: permission.module,
    //   });
    // });
  }
  // // Check if the user has administrative privileges
  // if (
  //   user.accountType === 'administrative' &&
  //   user.status === 'active' &&
  //   user.dbAccess === 'allowed'
  // ) {
  //   can('manage', 'all')
  // } else if (
  //   user.accountType === 'staff' &&
  //   user.status === 'active' &&
  //   user.dbAccess === 'allowed'
  // ) {
  //   // Define abilities based on permissions and modules
  //   user.permissionsDetails.forEach(permission => {
  //     can(permission.action, permission.subject, {
  //       module: permission.module
  //     })
  //   })
  // }
  return rules
}

export const buildAbilityFor = user => {
  return new AppAbility(defineRulesFor(user), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    // detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'manage',
  subject: 'all',
  module: 'accountsapp'
}

export default defineRulesFor
