import { LoanService } from "@/services/loan.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { Book } from "./bookSlice";
import { BookService } from "@/services/book.service";
import { toast } from "@/utils/toast";
import { router } from "expo-router";
import { UserService } from "@/services/user.service";

export interface Loan {
  id: number,
  Book: Book
  user_id: number,
  book_id: number,
  created_at: string,
  updated_at: string,
  due_at: string,
  return_at: string | null,
}
interface LoanState {
  loans: Loan[],
  status: "idle" | "pending" | "fullfill" | "reject",
  error: string | null
}
const initialState: LoanState = {
  loans: [], status: "idle", error: null
};
export const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    addAll: (state, action) => {
      state.loans = action.payload
    },
    add: (state, action) => {
      state.loans.push(action.payload)
    },
    delete: (state, action) => {
      state.loans = state.loans.filter((loan) => loan.id !== action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLoans.pending, (state, action) => {
      state.status = "pending"
    })
    builder.addCase(fetchLoans.fulfilled, (state, action) => {
      let loans = action.payload;
      loans.forEach((loan) => {
        loan.created_at = moment(loan.created_at).format("HH:MM DD/MM/YYYY");
        loan.updated_at = moment(loan.updated_at).format("HH:MM DD/MM/YYYY");
        loan.due_at = moment(loan.due_at).format("HH:MM DD/MM/YYYY");
        if (loan.return_at) loan.return_at = moment(loan.return_at).format("HH:MM DD/MM/YYYY");
      })
      state.loans = loans;
      state.status = "fullfill"
    })
    builder.addCase(fetchLoans.rejected, (state, action) => {
      state.error = action.payload as string
      state.status = "reject"
    })
    builder.addCase(addLoan.pending, (state, action) => {
      state.status = "pending"
    })
    builder.addCase(addLoan.fulfilled, (state, action) => {
      const loan = action.payload;
      loan.created_at = moment(loan.created_at).format("HH:MM DD/MM/YYYY");
      loan.updated_at = moment(loan.updated_at).format("HH:MM DD/MM/YYYY");
      loan.due_at = moment(loan.due_at).format("HH:MM DD/MM/YYYY");
      if (loan.return_at) loan.return_at = moment(loan.return_at).format("HH:MM DD/MM/YYYY");
      state.loans.push(loan)
      state.status = "fullfill"
    })
    builder.addCase(addLoan.rejected, (state, action) => {
      state.error = action.payload as string
      state.status = "reject"
    })
    builder.addCase(returnLoan.pending, (state, action) => {
      state.status = "pending"
    })
    builder.addCase(returnLoan.fulfilled, (state, action) => {
      state.loans = state.loans.filter((loan) => loan.id !== action.payload.id)
    })

    builder.addCase(returnLoan.rejected, (state, action) => {
      state.error = action.payload as string
      state.status = "reject"
    })
  },
});

export const fetchLoans = createAsyncThunk<Loan[], undefined>("loan/getAll", async (_, { rejectWithValue }) => {
  try {
    const loans = await LoanService.getAll();
    return loans
  } catch (error: any) {
    if (error.status === 401) {
      await UserService.logout()
      toast.error("Please login to countinue.")
      router.push("/auth/login")
      return rejectWithValue(error.error)
    }
    else {
      toast.error(error.error)
      router.push("/library")
      return rejectWithValue(error.error)
    }
  }
})

export interface loanBody {
  book_id: number,
  due_time: number
}
export const addLoan = createAsyncThunk<Loan, loanBody>("loan/add", async (body, { rejectWithValue }) => {
  try {
    const loan = await LoanService.add(body.book_id, body.due_time) as Loan;
    const book = await BookService.get(loan.book_id);
    loan.Book = book
    toast.success("Book borrowed successfully!");
    return loan
  } catch (error: any) {
    let message
    if (error.status === 400) {
      message = error.error
      toast.error(message);
      return rejectWithValue(message)
    }
    message = error.error

    if (error.status === 401) {
      await UserService.logout()
    };
    toast.error(message);
    return rejectWithValue(message)
  }
})

export const returnLoan = createAsyncThunk<Loan, number>("loan/return", async (id, { rejectWithValue }) => {
  try {
    const loan = await LoanService.return(id) as Loan;
    toast.success("Book returned successfully!");
    router.push({ pathname: "/library/borrowed" })
    return loan
  } catch (error: any) {
    let message
    if (error.status === 400) {
      message = error.error
      toast.error(message);
      return rejectWithValue(message)
    }
    message = error.error

    if (error.status === 401) {
      await UserService.logout()
    };
    toast.error(message);
    return rejectWithValue(message)
  }
})
export default loanSlice.actions