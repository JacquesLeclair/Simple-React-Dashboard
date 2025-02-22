import { lazy } from 'react'
import Parametros from '../pages/Parametros'
import Riscos from '../pages/RiskDashboard'
import RiskDashboard from '../pages/RiskDashboard'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Tables = lazy(() => import('../pages/Tables'))


/**
 * ⚠ These are internal routes..!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/parametros',
    component: Parametros,
  },
  {
    path: '/risk-dashboard',
    component: RiskDashboard,
  },
]

export default routes
