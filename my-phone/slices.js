const { configureStore } = require("@reduxjs/toolkit");
import studentSlice from "./studentSlice";

const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
  },
});

export default store;
