import { configureStore } from "@reduxjs/toolkit"
import focusReducer from './focus'
import placeholderReducer from './placeholder'

export const store = configureStore({
  reducer: {
    focus: focusReducer,
    placeholder: placeholderReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch