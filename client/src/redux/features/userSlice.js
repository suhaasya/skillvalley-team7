import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  user: {},
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    },
    setError: (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setError } = userSlice.actions;
