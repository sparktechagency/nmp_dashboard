import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import categorySliceReducer from "../features/category/categorySlice";
import adminSliceReducer from "../features/admin/adminSlice";
import userSliceReducer from "../features/user/userSlice";
import brandSliceReducer from "../features/brand/brandSlice";
import flavorSliceReducer from "../features/flavor/flavorSlice";
import typeSliceReducer from "../features/type/typeSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    category: categorySliceReducer,
    admin: adminSliceReducer,
    user: userSliceReducer,
    brand: brandSliceReducer,
    flavor: flavorSliceReducer,
    type: typeSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
