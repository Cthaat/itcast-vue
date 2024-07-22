import axios from 'axios'
import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus/es/components'
import router from '@/router/index'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

// 创建axios实例
const instance = axios.create({
  // TODO 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 请求拦截器，携带 token 等信息
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    // TODO 响应拦截器，处理响应数据，处理业务失败
    ElMessage.error(res.data.message || '请求失败')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 错误处理401
    if (err.response.status === 401) {
      ElMessage.error('请先登录')
      router.push('/login')
      return Promise.reject(err)
    }
    // TODO 错误处理500
    ElMessage.error(err.response.data.message || '请求失败')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
