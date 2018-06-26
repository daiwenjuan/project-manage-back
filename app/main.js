/**
 *  Created by daiwenjuan on 2018/6/25 上午10:50.
 */
import React from 'react'

export default class Home extends React.Component {
  handleOnClick() {
    this.props.actions.changeText()
  }

  render() {
    return <div onClick={this.handleOnClick.bind(this)}>hello world {this.props.text} </div>
  }
}