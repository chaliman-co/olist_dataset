import { createSlice } from '@reduxjs/toolkit'

export const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    value: null
  },
  reducers: {
    set (state, action) {
      state.value = action.payload
    },
    clear (state, action) {
      state.value = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { set, update } = sellerSlice.actions

export default sellerSlice.reducer
