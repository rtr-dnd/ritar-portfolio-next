import { createAsyncThunk, createSlice, current, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from ".."

export type Vec2 = {
  x: number,
  y: number
}

export type PlaceholderState = {
  target: Vec2[]
}

const initialState: PlaceholderState = {
  target: []
}

export const placeholderSlice = createSlice({
  name: 'placeholder',
  initialState,
  reducers: {
    changeTarget: (state, action: PayloadAction<Vec2[]>) => {
      console.log('target changed: ' + action.payload)
      state.target = action.payload
    },
  }, 
})

export const {
  changeTarget
} = placeholderSlice.actions
export default placeholderSlice.reducer