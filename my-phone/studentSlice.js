import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "Vũ Đức Tài", year: 2003 },
  { id: 2, name: "Nguyễn Văn Cường", year: 2002 },
  { id: 3, name: "Nguyễn Văn A", year: 2005 },
  { id: 4, name: "Trần Văn B", year: 1999 },
  { id: 5, name: "Lê Văn Luyện", year: 2000 },
];

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    update: (state, action) => {
      const { id, name, year } = action.payload;
      state.forEach((item) => {
        if (item.id == id) {
          (item.name = name), (item.year = year);
        }
      });
      return state;
    },
  },
});
export default studentSlice;
