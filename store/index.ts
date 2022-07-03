import { configureStore } from "@reduxjs/toolkit"
import focusReducer from './focus'

export const store = configureStore({
  reducer: {
    focus: focusReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch