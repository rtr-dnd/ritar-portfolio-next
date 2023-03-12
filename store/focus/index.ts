import { createAsyncThunk, createSlice, current, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from ".."
import { Content, works } from "../../contents/contents"

export type FocusState = {
  focusVal: number,
  isItemOpen: boolean,
  isItemHidden: boolean,
  activeItem: Content
}

const initialState: FocusState = {
  focusVal: 1,
  isItemOpen: false,
  isItemHidden: false, 
  activeItem: works[0]
}

export const asyncFocus = createAsyncThunk('focus/asyncFocus', async (value: number, thunkAPI) => {
  const currentVal = (thunkAPI.getState() as { focus: FocusState }).focus.focusVal
  if (value > currentVal) {
    for (let i = currentVal; value - i > 0.01; i += 1/2) {
      if (i != currentVal) await new Promise(resolve => setTimeout(resolve, 200))
      thunkAPI.dispatch(focusSlice.actions.focusAt(i + 1/2))
    }
    return
  }
  for (let i = currentVal; i - value > 0.1; i -= 1/2) {
    if (i != currentVal) await new Promise(resolve => setTimeout(resolve, 200))
    thunkAPI.dispatch(focusSlice.actions.focusAt(i - 1/2))
  }
})

export const asyncSwap = createAsyncThunk('focus/asyncSwap', async(value: Content, thunkAPI) => {
  thunkAPI.dispatch(focusSlice.actions.setHidden(true))
  await new Promise(resolve => setTimeout(resolve, 200))
  thunkAPI.dispatch(focusSlice.actions.setItem(value))
  thunkAPI.dispatch(focusSlice.actions.setHidden(false))
})

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    focusAt: (state, action: PayloadAction<number>) => {
      state.focusVal = action.payload
    },
    setDrawer: (state, action: PayloadAction<boolean>) => {
      state.isItemOpen = action.payload
    },
    setHidden: (state, action: PayloadAction<boolean>) => {
      state.isItemHidden = action.payload
    },
    setItem: (state, action: PayloadAction<Content>) => {
      state.activeItem = action.payload
    },
  }, 
})

export const {
  focusAt,
  setDrawer,
  setHidden,
  setItem
} = focusSlice.actions
export default focusSlice.reducer
