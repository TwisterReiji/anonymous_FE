import axios from 'axios'

let instantAxios = axios.create({
    timeout: 20000,
    baseURL: 'http://localhost:4000'
})

instantAxios.interceptors.request.use(req => {
    const token = localStorage.getItem('accessToken')
    req.headers['Authorization'] = 'Bearer ' + token
    return req
})

export const Login = (body) => {
    return instantAxios.post('/login', body)
}

export const Register = (body) =>{
    return instantAxios.post('/register', body)
}
