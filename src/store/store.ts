import { configureStore } from "@reduxjs/toolkit";

import adsrSlice from "./adsrSlice";
import keyboardSlice from "./keyboardSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    keyboard: keyboardSlice,
    adsr: adsrSlice,
    theme: themeSlice,
    // instrument: instrumentSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
