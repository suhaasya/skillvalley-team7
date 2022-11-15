import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import userReducer from "../features/userSlice";
import usersReducer from "../features/usersSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});

export default store;
