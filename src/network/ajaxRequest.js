import axios from 'axios'
const baseURL = 'https://localhost:44349/'
export default function request(config) {

    const instance = axios.create({
        timeout: 5000,
        headers: { 'content-type': 'application/json' },
        baseURL: baseURL
    })
    
    // 添加token值,请求拦截器
     // 添加token值,请求拦截器
     instance.interceptors.request.use(config => {
        config.headers.Authorization = sessionStorage.getItem('token')
        return config
    }) 
    return instance(config)
}