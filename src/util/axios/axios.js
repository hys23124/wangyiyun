// 引入axios
import axios from 'axios'

// 重新创建实例
let http = axios.create({
    baseURL:'http://localhost:3000'
})

// axios拦截器
// 请求拦截
http.interceptors.request.use(req=>{
    return req
})
// 响应拦截
http.interceptors.response.use(res=>{
    return res.data
})

// 导出
export default http