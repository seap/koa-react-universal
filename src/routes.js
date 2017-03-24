// only import the modules necessary for initial render
import App from './containers/App'

// childRoutes can be chunked or otherwise loaded programmatically
// https://webpack.js.org/guides/code-splitting-require/#require-ensure-
// require.ensure(dependencies: String[], callback: function(require), chunkName: String)
// home page
const home = {
  path: '/home',
  getComponent(location, callback) {
    require.ensure([], require => callback(null, require('./containers/Home').default), 'home')
  }
}


// instead of using JSX, we recommend using react-router
// plain route objects to build route definitions
export const createRoutes = store => ({
  path: '/',
  component: App,
  getIndexRoute(location, callback) {
    require.ensure([], require => callback(null, {component: require('./containers/Home').default}, 'home'))
  },
  childRoutes: [
    home
  ]
})

export default createRoutes
