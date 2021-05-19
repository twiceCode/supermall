import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    });
    // 请求拦截
    instance.interceptors.request.use(resolve => {
        return resolve;
    }, err => {

    })
    // 响应拦截
    instance.interceptors.response.use(resolve => {
        return resolve.data;
    }, err => {

    })
    // 发送网络请求
    return instance(config);
}