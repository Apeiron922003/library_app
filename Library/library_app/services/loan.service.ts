import { client } from "@/utils/client"
export const LoanService = {
    getAll: async () => {
        try {
            const { data } = await client.get(`/loans`);
            return data.data
        } catch (error) {
            return Promise.reject(error)
        }
    },
    get: async (id: number) => {
        try {
            const { data } = await client.get(`/loans/${id}`);
            return data.data
        } catch (error) {
            return Promise.reject(error)

        }
    },
    add: async (book_id: number, due_time: number) => {
        try {
            const { data } = await client.post(`/loans`, { book_id, due_time });
            return data.data
        } catch (error) {
            return Promise.reject(error)

        }
    },
    return: async (id: number) => {
        try {
            const { data } = await client.patch(`/loans/${id}`, { return_at: new Date() });
            const loan = data.data
            await client.patch(`/books/${loan.book_id}`)
            return data.data
        } catch (error) {
            return Promise.reject(error)
        }
    }
}