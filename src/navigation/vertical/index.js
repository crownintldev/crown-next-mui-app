import {
  accountArrays,
  automationArray,
  databaseArray,
  homeArray,
  settingsArray,
  ticketingArrays
} from './menu'

const navigation = () => {
  return [
    {
      title: 'Home',
      key: 'home',
      icon: 'iconoir:home',
      path: '/home',
      activeChildPath: '/dashboards/analytics',
      children: homeArray()
    },
    {
      title: 'Accounts',
      key: 'accountsapp',
      icon: 'mdi:finance',
      path: '/accounts',
      activeChildPath: '/dashboards/analytics',
      children: accountArrays()
    },
    {
      title: 'Tickets',
      key: 'tickets',
      icon: 'mdi:airplane',
      path: '/tickets',
      activeChildPath: '/welcome',
      children: ticketingArrays()
    },
    {
      title: 'Tour',
      key: 'tour',
      icon: 'bx:trip',
      path: '/tour',
      activeChildPath: '/coming-soon',
      children: ticketingArrays()
    },
    {
      title: 'Hotel',
      key: 'hotel',
      icon: 'ri:hotel-fill',
      path: '/tour',
      activeChildPath: '/coming-soon',
      children: ticketingArrays()
    },
    {
      title: 'Insurance',
      key: 'insurance',
      icon: 'healthicons:health-data-security',
      path: '/tour',
      activeChildPath: '/coming-soon',
      children: ticketingArrays()
    },
    {
      title: 'Laboratory',
      key: 'laboratoryapp',
      icon: 'material-symbols-light:health-metrics',
      path: '/tour',
      activeChildPath: '/coming-soon',
      children: ticketingArrays()
    },
    {
      lineBreak: true
    },
    {
      title: 'Automation Tools',
      key: 'automation',
      icon: 'nimbus:marketing',
      path: '/automation',
      activeChildPath: '/chatmodule/chat',
      children: automationArray()
    },
    {
      title: 'Database',
      key: 'database',
      icon: 'material-symbols:database',
      path: '/database',
      activeChildPath: '/dashboards/analytics',
      children: databaseArray()
    },
    {
      lineBreak: true
    },
    {
      title: 'Settings',
      key: 'settings',
      icon: 'mi:settings',
      path: '/settings',
      activeChildPath: '/dashboards/crm',
      children: settingsArray()
    }
  ]
}

export default navigation
