import { configureStore } from '@reduxjs/toolkit';
import checkboxReducer from './checkboxSlice';

const store = configureStore({
  reducer: {
    checkboxes: checkboxReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
