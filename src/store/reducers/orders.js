import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    value: null,
    total: 0
  },
  reducers: {
    set (state, action) {
      state.value = action.payload
      state.total = action.total
    },
    delete (state, action) {
      const order = action.payload
      state.value = state.value.filter(otherOrder => otherOrder.order_id !== order.order_id)
    },
    insert (state, action) {
      for (let i = 0, j = action.payload.index; i < action.payload.value.length; i++, j++) {
        state.value[j] = action.payload.value[i]
      }
    },
    update (state, action) {
      const order = state.value.find(item => item.order_id === action.payload.order_id)
      Object.assign(order, action.update)
      // }
    },
    clear (state, action) {
      state.value = null
    }
  }
})

export const { set, update } = ordersSlice.actions

export default ordersSlice.reducer
