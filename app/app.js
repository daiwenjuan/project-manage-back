/**
 *  Created by daiwenjuan on 2018/6/26 下午6:30.
 */
import React, { Children, Component, cloneElement } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props
    return <div>
      <div onClick={() => {alert(22)}}>dsfds</div>
      {children}
    </div>
  }
}

module.exports = App