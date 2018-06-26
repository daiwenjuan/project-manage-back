/**
 *  Created by daiwenjuan on 2018/6/26 下午6:30.
 */
import React from 'react'

class App extends React.Component {

  render () {
    let {children} = this.props
    return <div>
      <div>dsfds</div>
      {children}
    </div>
  }
}

module.exports = App