import axios from 'axios'
import store from './store'
import router from './router'

// http的全局拦截
// token要放在我们请求的header上面给后端

export default function serAxios () {
  // 请求拦截
  axios.interceptors.request.use(
    config => {
      if (store.state.token) {
        config.headers.token = store.state.token
      }
      return config
    }
  )
  // 每次的请求有返回的都经过这个拦截器
  axios.interceptors.response.use(
    // 请求失败
    response => {
      if (response.status === 200) {
        const data = response.data
        if (data.code === -1) {
          // 登录过期 需要重新登录,清空vuex的token和localstorage的token
          store.commit(`settoken`, '')
          localStorage.removeItem('token')
          router.replace({ path: '/login' })
        }
        return data
      }
      return response
    }
  )
}
