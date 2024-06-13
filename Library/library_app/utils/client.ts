import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

let refreshTime = 0
export const client = axios.create({
    baseURL: "http://192.168.1.3:3000/api/"
    // baseURL: "http://localhost:3000/api/"

})

client.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem("access_token")
        if (!token) return config
        config.headers.Authorization = `Bearer ${token}`
        return config
    } catch (error) {
        return config
    }
})

client.interceptors.response.use((res) => {
    refreshTime = 0
    return res;
}, async (err) => {
    const { config, response: { data: response } } = err;
    if (err.code === "ERR_NETWORK") return Promise.reject(response)
    const originalRequest = config;
    if (response.status !== 401 || refreshTime < 1) return Promise.reject(response)
    // Refresh 
    refreshTime += 1
    const token = await AsyncStorage.getItem("refresh_token")
    if (!token) {
        // Đăng xuất
        await AsyncStorage.removeItem("access_token")
        await AsyncStorage.removeItem("access_token")
        return Promise.reject(response)
    }
    originalRequest.headers['Authorization'] = `Bearer ${token}`;
    try {
        const { data } = await client.post("/auth/refresh")
        AsyncStorage.setItem("access_token", data.data.access_token)
        AsyncStorage.setItem("refresh_token", data.data.refresh_token)
        // Thực hiện lại request
        originalRequest.headers['Authorization'] = `Bearer ${data.data.access_token}`;
        return client(originalRequest)
    } catch (e: any) {
        return Promise.reject(e.response.data)
    }
})