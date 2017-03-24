import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import createStore from './store/createStore'

// store instantiation
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// render setup
const mountNode = document.getElementById('root')
let render = () => {
  const routes = require('./routes').default(store)
  ReactDOM.render(<Root store={store} routes={routes} />, mountNode)
}

// check if HMR is enabled, excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = error => {
    const RedBox = require('redbox-react').default
    ReactDOM.render(<RedBox error={error} />, mountNode)
  }

  // wrap render in try/catch
  render = () => {
    try {
      renderApp()
    } catch (error) {
      console.error(error)
      renderError(error)
    }
  }

  // accept update of dependency
  module.hot.accept('./routes', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(mountNode)
      render()
    })
  )
}

render()
