import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (roles, subject) => {
  const { can, rules } = new AbilityBuilder(AppAbility)
  // if (role === 'admin') {
  //   can('manage', 'all')
  // } else if (roles === 'client') {
  //   can(['read'], 'acl-page')
  // } else {
  //   can(['read', 'create', 'update', 'delete'], subject)
  // }

  // roles.forEach(role => {
  //   const [subject, action] = role.name.split('-');
  //   // console.log(subject, action)
  //   if (subject && action) {
  //     can(subject, action);
  //   }
  // });
  if(roles){
    can('manage', 'all')
  }
  else{
    can(['read', 'create', 'update', 'delete'], subject)
  }
  return rules
}

export const buildAbilityFor = (roles, subject) => {
  return new AppAbility(defineRulesFor(roles, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
