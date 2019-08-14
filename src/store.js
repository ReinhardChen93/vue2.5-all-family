import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token: '',
    cartarry: JSON.parse(localStorage.getItem('cartarry')) || [] // 存储购物车商品的数组,如果localStorage里有cartarry就拿,没有就为空
  },
  mutations: {
    settoken (state, token) {
      // 设置vuex的token
      state.token = token
    },
    // 添加商品到购物车
    tocart (state, tag) {
      // eslint-disable-next-line eqeqeq
      let goods = state.cartarry.find(v => v.title == tag.label)
      if (goods) {
        goods.cartCount += 1
      } else {
        state.cartarry.push({ title: tag.label, cartCount: 1 })
      }
    },
    // 购物车数量加一
    cartadd (state, index) {
      state.cartarry[index].cartCount++
    },
    // 购物车商品数量减一
    cartremove (state, index) {
      if (state.cartarry[index].cartCount > 1) {
        state.cartarry[index].cartCount--
      } else {
        if (window.confirm('确定要从购物车移除商品吗?')) {
          state.cartarry.splice(index, 1)
        }
      }
    },
    // 清空购物车
    clearcart (state) {
      state.cartarry = []
    }
  },
  actions: {

  },
  // 相当于vue的计算属性
  getters: {
    countsum: state => {
      let num = 0
      state.cartarry.forEach(v => {
        num += v.cartCount
      })
      return num
    }
  }
})
// 家庭每次调用mutats的时候,都会进入这个方法,然后我们可以做一些自己想做的处理
store.subscribe((mutations, state) => {
  localStorage.setItem('cartarry', JSON.stringify(state.cartarry))
})

export default store
