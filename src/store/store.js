import { configureStore } from '@reduxjs/toolkit'
import sellerReducer from './reducers/seller.js'
import ordersReducer from './reducers/orders.js'

export default configureStore({
  reducer: {
    orders: ordersReducer,
    seller: sellerReducer
  }
})
