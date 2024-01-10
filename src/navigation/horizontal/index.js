const navigation = () => [
  {
    title: 'Dashboards',
    icon: 'tabler:smart-home',

    // badgeContent: 'new',
    badgeColor: 'error',
    children: [
      {
        title: 'Analytics',
        path: '/dashboards/analytics'
      },

      // {
      //   title: 'CRM',
      //   path: '/dashboards/crm'
      // },
      {
        title: 'eCommerce',
        path: '/dashboards/ecommerce'
      }
    ]
  },
  {
    title: 'Home',
    path: '/home',
    icon: 'tabler:smart-home'
  },
  {
    title: 'Second Page',
    path: '/second-page',
    icon: 'tabler:mail'
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'tabler:shield'
  }
]

export default navigation
