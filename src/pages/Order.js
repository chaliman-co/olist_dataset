import Pagination from '../components/Pagination'
import { useSelector, useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './styles/order.css'
import { useState } from 'react'
import { get } from '../util.js'
const pageSize = Number(process.env.REACT_APP_PAGE_SIZE)
export default function Order () {
  const orders = useSelector(state => state.orders.value)
  const total = useSelector(state => state.orders.total)
  const store = useStore()
  const [pageNumber, setPageNumber] = useState(0)
  const navigate = useNavigate()
  const offset = pageNumber * pageSize
  const renderedOrders = orders.slice(offset, offset + pageSize).map((order, index) => (
    <tr className='order-row' key={offset + index} onClick={() => navigate(`/orders/${order.order_id}`)} title='open'>
      <td>{offset + index}</td>
      <td>{order.order_id}</td>
      <td>{order.order_item_id}</td>
      <td>{order.product_id}</td>
      <td>{order.seller_id}</td>
      <td>{new Date(order.shipping_limit_date).toDateString()}</td>
      <td>{order.price}</td>
      <td>{order.freight_value}</td>
    </tr>
  ))
  return (
    <>

      <h2>Orders</h2>

      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Id</th>
            <th>Item Id</th>
            <th>Product Id</th>
            <th>Seller Id</th>
            <th>Shipping Limit Date</th>
            <th>Price</th>
            <th>Freight Value</th>
          </tr>
        </thead>
        <tbody>
          {renderedOrders}
        </tbody>
      </table>
      <Pagination pageSize={pageSize} total={total} pageNumber={pageNumber} navigate={pageNumber => go(pageNumber, store, setPageNumber)} items={store.getState().orders} />
    </>
  )
}
async function go (pageNumber, store, setPageNumber) {
  const orders = store.getState().orders.value
  const offset = pageNumber * pageSize
  if (!orders[offset]) {
    const ordersForPage = (await (await get(`/order_items?${new URLSearchParams({ offset })}`)).json()).data
    store.dispatch({ type: 'orders/insert', payload: { value: ordersForPage, index: offset } })
  }
  setPageNumber(pageNumber)
}
