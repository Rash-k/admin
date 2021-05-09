import axios from 'axios'
import { Message,Loading } from 'element-ui'
import router from './router/router'

let loading;

function startLoading(){
    loading = Loading.service({
        lock:true,
        text:'正在加载中',
        spinner: 'el-icon-loading',
        background:'rgba(245,245,245,0.7)'
    })
}

function endLoading(){
    setTimeout(() => {
        loading.close()
    }, 700)
}

const http = axios.create({
    baseURL:'http://localhost:3000/api/'
})

//请求拦截
http.interceptors.request.use(config=>{
    startLoading();
    if(localStorage.eleToken){
        //设置统一请求头
        config.headers.Authorization = localStorage.eleToken
    }

    return config;
},error=>{return Promise.reject(error)})

//响应拦截
http.interceptors.response.use(response=>{
    endLoading();
    return response;
},error=>{
    endLoading();
    Message.error(error.response.data);
    //获取错误状态码
    const { status } = error.response
    if(status==401){
        Message.error('token失效，请重新登录')
        //清楚token
        localStorage.removeItem('eleToken')
        router.push('/login ')
    }

    return Promise.reject(error)
})


export default http
