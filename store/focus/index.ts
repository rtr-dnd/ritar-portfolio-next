import { createAsyncThunk, createSlice, current, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from ".."

export type FocusState = {
  focusVal: number
}

const initialState: FocusState = {
  focusVal: 0
}

export const asyncFocus = createAsyncThunk('focus/asyncFocus', async (value: number, thunkAPI) => {
  const currentVal = (thunkAPI.getState() as { focus: FocusState }).focus.focusVal
  if (value > currentVal) {
    for (let i = currentVal; value - i > 0.01; i += 1/3) {
      if (i != currentVal) await new Promise(resolve => setTimeout(resolve, 200))
      thunkAPI.dispatch(focusSlice.actions.focusAt(i + 1/3))
    }
    return
  }
  for (let i = currentVal; i - value > 0.1; i -= 1/3) {
    if (i != currentVal) await new Promise(resolve => setTimeout(resolve, 200))
    thunkAPI.dispatch(focusSlice.actions.focusAt(i - 1/3))
  }
})

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    focusAt: (state, action: PayloadAction<number>) => {
      console.log('focusing to ' + action.payload)
      state.focusVal = action.payload
    },
  }, 
})

export const {
  focusAt
} = focusSlice.actions
export default focusSlice.reducer