import { configureStore } from "@reduxjs/toolkit";
import fileSystemReducer from "../features/fileSystemSlice";

const store = configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
  },
});

export default store;
