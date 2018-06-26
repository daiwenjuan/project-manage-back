/**
 *  Created by daiwenjuan on 2018/6/26 下午6:30.
 */
import React from 'react'

export default class App extends React.Component {

  render() {
    return <div>
      {this.props.children}
    </div>
  }
}