import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  users: [],
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    },
    setError: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setUsers, setError } = usersSlice.actions;
