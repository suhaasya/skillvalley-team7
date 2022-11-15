import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  posts: [],
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = "";
    },
    setError: (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { setPosts, setError } = postsSlice.actions;
