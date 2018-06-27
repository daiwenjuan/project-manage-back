/**
 *  Created by daiwenjuan on 2018/6/26 下午6:30.
 */
import React from 'react'

class App extends React.Component {

  render() {
    return <div>
      <div onClick={() => {alert(22)}}>dsfds</div>
      {this.props.children}
    </div>
  }
}

module.exports = App