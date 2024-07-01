import bookReducer from "../reducers/Reducer";
import { configureStore } from '@reduxjs/toolkit';



const store = configureStore({
  reducer: {
    bookData: bookReducer,
  },

});

export default store;