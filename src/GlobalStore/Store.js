import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './SearchState'

export default configureStore({
  reducer: {
    search: searchReducer,
  },
});
