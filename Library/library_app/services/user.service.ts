import { client } from "@/utils/client"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const UserService = {
    login: async (limit: number = 10, page: number = 1) => {
        try {
            const { data } = await client.get(`/books?page=${page}&limit=${limit}`);
            return data.data
        } catch (error) {
            return Promise.reject(error)
        }
    },
    logout: async () => {
        try {
            const { data } = await client.post(`/auth/logout`);
            await AsyncStorage.removeItem("user")
            await AsyncStorage.removeItem("access_token")
            await AsyncStorage.removeItem("refresh_token")
            router.push("/auth/login")
            return data.data
        } catch (error: any) {
            router.push("/auth/login")
            return Promise.reject(error)
        }
    },
    register: async () => { },
    refresh: async () => { }
}