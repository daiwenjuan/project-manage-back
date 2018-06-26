/**
 *  Created by daiwenjuan on 2018/6/26 下午1:44.
 */
export default  function myApp(state, action) {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return {
        text: state.text === 'Hello' ? 'Stark' : 'Hello'
      }
    default:
      return {
        text: 'Hello'
      }
  }
}