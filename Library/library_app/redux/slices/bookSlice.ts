import { ThunkAction, UnknownAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookService } from "@/services/book.service";
import { toast } from "@/utils/toast";
import { router } from "expo-router";
export interface Book {
  id: number,
  title: string,
  description: string,
  cover: string,
  author: string,
  publisher: string,
  release_year: number,
  number_of_copies: number,
  copies_available: number,
  status: boolean
  created_at: string,
  updated_at: string,
}
interface BooksState {
  books: Book[] | null,
  detail: Book | null | undefined,
  status: "idle" | "pending" | "fullfill" | "reject"
}
const initialState: BooksState = {
  books: null,
  detail: null,
  status: "idle"
};
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getAll: (state, action) => { },
    setAll: (state, action) => state = action.payload,
    get: (state, action) => {
      state.detail = state.books?.find((book) => book.id = action.payload)
    },
    add: (state, action) => { },
    return: (state, action) => {
      state.books = state.books!.filter((book) => {
        if (book.id == action.payload) {
          book.copies_available++;
        }
        return book
      })
    },
    borrow: (state, action) => {
      state.books = state.books!.filter((book) => {
        if (book.id == action.payload) {
          book.copies_available--;
        }
        return book
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(getBooks.pending, (state, action) => {
      state.status = "pending"
    })
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.books = action.payload
      state.status = "fullfill"
    })
    builder.addCase(getBooks.rejected, (state, action) => {
      state.status = "reject"
    })
    builder.addCase(getBook.pending, (state, action) => {
      state.status = "pending"
    })
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.detail = action.payload
      state.books?.push(action.payload)
      state.status = "fullfill"
    })
    builder.addCase(getBook.rejected, (state, action) => {
      state.status = "reject"
    })
  },
});

export const getBooks = createAsyncThunk<Book[], undefined>("book/getAll", async (_, { rejectWithValue }) => {
  try {
    const books = await BookService.getAll();
    return books
  } catch (error) {
    toast.error("Netword Error");
    router.push("/auth/login")
    return null
  }

})
export const getBook = createAsyncThunk<Book, number, {}>("book/get", async (id) => {
  try {
    const book = await BookService.get(id);
    return book
  } catch (error) {
    toast.error("Netword Error");
    router.push("/auth/login")
    return null
  }
})

export default bookSlice