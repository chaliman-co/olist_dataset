import { useParams, useNavigate } from 'react-router-dom'

import { useSelector, useStore } from 'react-redux'
import { useState } from 'react'
import { post } from '../util'
import '../pages/styles/edit_order.css'

export default function EditOrder () {
  const store = useStore()
  const id = useParams().order_id
  const order = useSelector(state => state.orders.value.find(item => item.order_id === id))
  const navigate = useNavigate()
  const [price, setPrice] = useState(order.price)
  const [freightValue, setFreightValue] = useState(order.freight_value)
  const [shippingLimitDate, setShippingLimitDate] = useState(order.shipping_limit_date)
  const [orderItemId, setOrderItemId] = useState(order.order_item_id)
  return (
    <>

      <form onSubmit={(e) => { e.preventDefault(); submit(order, { price, freightValue, shippingLimitDate, orderItemId }, navigate, store) }} className='edit-order-form'>
        <fieldset>
          <legend>Edit Order {order.order_id}</legend>

          <div className='container'>
            <label htmlFor='price'><b>Price</b></label>
            <input
              id='price' value={price}
              onChange={e => setPrice(e.target.value)} type='number' placeholder='Enter Price' required
            />
            <label htmlFor='freight_value'><b>Freight Value</b></label>
            <input
              id='freight_value' value={freightValue} type='number'
              onChange={e => setFreightValue(e.target.value)}
              placeholder='Enter Freight Value' required
            />
            <label htmlFor='shipping_limit_date'><b>Shipping Limiting Date</b></label>
            <input
              id='shipping_limit_date' value={new Date(shippingLimitDate).toISOString().substring(0, 10)} type='date'
              onChange={e => setShippingLimitDate(e.target.value)}
              placeholder='Enter Shipping Limit Date' required
            />
            <label htmlFor='order_item_id'><b>Order Item Id</b></label>
            <input
              id='order_item_id' value={orderItemId} type='number'
              onChange={e => setOrderItemId(e.target.value)}
              placeholder='Enter Order Item Id' required
            />
            <button type='submit'>Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  )
}
async function submit (order, update, navigate, store) {
  await post(`/orders/${order.order_id}`, update)
  store.dispatch({ type: 'orders/update', payload: order, update })
  navigate('/orders')
}
