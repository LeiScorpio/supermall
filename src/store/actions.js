//导入mutation常量
import { ADD_COUNTER, ADD_GOODS } from './mutation-type'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1！')
      } else {
        payload.count = 1
        payload.checked = true
        context.commit(ADD_GOODS, payload)
        resolve('商品添加成功！')
      }
    })
  }
}
