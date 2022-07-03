import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type FocusState = {
  focusVal: number
}

const initialState: FocusState = {
  focusVal: 0
}

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    focusAt: (state, action: PayloadAction<number>) => {
      state.focusVal = action.payload
    },
  }
})

export const {
  focusAt
} = focusSlice.actions
export default focusSlice.reducer