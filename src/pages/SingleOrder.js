import { useSelector, useStore } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteReq } from '../util'
import '../pages/styles/single_order.css'

export default function () {
  const id = useParams().order_id
  const order = useSelector(state => state.orders.value.find(item => item.order_id === id))
  const navigate = useNavigate()
  const store = useStore()
  if (!order) return <></>
  return (
    <>
      <h2>Order</h2>

      <table>
        <tbody>
          <tr>
            <th>Id:</th>
            <td>{order.order_id}</td>
          </tr>
          <tr>
            <th>Order Item Id:</th>
            <td>{order.order_item_id}</td>
          </tr>
          <tr>
            <th>Product Id:</th>
            <td>{order.product_id}</td>
          </tr>
          <tr>
            <th>seller Id:</th>
            <td>{order.seller_id}</td>
          </tr>
          <tr>
            <th>Freight Value:</th>
            <td>{order.freight_value}</td>
          </tr>
          <tr>
            <th>Shipping Limit Date:</th>
            <td>{new Date(order.shipping_limit_date).toDateString()}</td>
          </tr>
          <tr>
            <th>Price:</th>
            <td>{order.price}</td>
          </tr>
        </tbody>
      </table>
      <button className='edit action-btn' onClick={() => navigate('edit')}>Edit</button>

      <button className='delete action' onClick={() => deleteOrder(order, navigate, store)}>Delete</button>
    </>
  )
}
async function deleteOrder (order, navigate, store) {
  if (!window.confirm(`are you sure you want to delete order ${order.order_id}?`)) return
  const response = await deleteReq(`/order_items/${order.order_id}`)
  if (response.status !== 200) window.alert('Network Error. Please try again')
  else {
    store.dispatch({ type: 'orders/delete', payload: order })
    navigate('/orders')
  }
}
