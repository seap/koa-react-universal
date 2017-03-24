import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

class Root extends Component {
  
  render () {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default Root
