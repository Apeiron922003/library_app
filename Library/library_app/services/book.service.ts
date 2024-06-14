import { client } from "@/utils/client"

export const BookService = {
    getAll: async (limit: number = 60, page: number = 1) => {
        try {
            const { data } = await client.get(`/books?page=${page}&limit=${limit}`);
            return data.data
        } catch (error) {
            return Promise.reject(error)
        }
    },
    get: async (id: number) => {
        try {
            const { data } = await client.get(`/books/${id}`);
            return data.data
        } catch (error) {
            return Promise.reject(error)
        }
    },
}