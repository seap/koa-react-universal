import React, { Component, PropTypes } from 'react'
import styles from './loading.scss'

export default class Loader extends Component {

  renderMessage() {
    const { message } = this.props
    return (
      <p>{message}</p>
    )
  }

  render() {
    const { visible } = this.props
    const fancyClass= !visible ? '' : 'show'
    return (
      <div className={`${styles['uiLoadingBlock']} ${styles[fancyClass]} `}>
        <div className={`${styles['uiLoadingCnt']}`}>
          <i className={`${styles['uiLoadingBright']}`}></i>
          {this.renderMessage()}
        </div>
      </div>
    )
  }
}

Loader.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string
}

Loader.defaultProps = {
  visible: false,
  message: '加载中...'
}
