//导入mutation常量
import { ADD_COUNTER, ADD_GOODS } from './mutation-type'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_GOODS](state, payload) {
    state.cartList.push(payload)
  }

}
