/**
 * ⚠ These are used just to render the Sidebar...!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/forms',
    icon: 'FormsIcon',
    name: 'Forms',
  },
  {
    path: '/app/tables',
    icon: 'TablesIcon',
    name: 'Tables',
  },
  {
    path: '/app/parametros',
    icon: 'MenuIcon', // Use an appropriate icon for this
    name: 'Parametros',
  },
  {
    path: '/app/risk-dashboard',
    icon: 'ChartsIcon', // Use an appropriate icon for this
    name: 'Parecer Consolidado', // name that appear in Sidebar
  },
];

export default routes
