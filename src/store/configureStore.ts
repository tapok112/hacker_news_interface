import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './rootReducer'

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
