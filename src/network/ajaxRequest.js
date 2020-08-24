import axios from 'axios'
const baseURL = 'https://localhost:44364/'
export default function request(config) {

    const instance = axios.create({
       
        headers: { 'content-type': 'application/json' },
        baseURL: baseURL
    })
    
    // 添加token值,请求拦截器
     instance.interceptors.request.use(config => {
        config.headers.Authorization = sessionStorage.getItem('token')
        return config
    }) 
    return instance(config)
}