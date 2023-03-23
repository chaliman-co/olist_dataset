import { createBrowserRouter, redirect } from 'react-router-dom'
import App from './pages/App'
import Login from './pages/Login'
import Order from './pages/Order'
import store from './store/store'
import { get } from './util'
import SingleOrder from './pages/SingleOrder'
import EditOrder from './pages/EditOrder'
export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    async loader () {
      if (!store.getState().seller.value) {
        const seller = JSON.parse(window.localStorage.getItem('seller'))
        if (seller) store.dispatch({ type: 'seller/set', payload: seller })
        else return redirect('/login')
      }
      return null
    },
    children: [
      {
        path: '/',
        loader () {
          return redirect('/orders')
        }
      },
      {
        path: '/orders',
        element: <Order />,
        async loader () {
          if (!store.getState().seller.value) {
            return new Promise((resolve, reject) => {
              store.subscribe(async () => {
                if (!store.getState().orders.value) {
                  store.dispatch({ type: 'orders/set', payload: (await (await get('/order_items')).json()).data })
                }
                resolve(null)
              })
            })
          } else if (!store.getState().orders.value) {
            try {
              const resp = await get('/order_items')
              const payload = (await resp.json())
              store.dispatch({ type: 'orders/set', payload: payload.data, total: payload.total })
            } catch (err) {
              window.alert('Could not connect to the api. Please make sure you have set everything up correctly.')
              document.write('Cannot display data due to network Error')
            }
          }
          return null
        }
      },
      {
        path: '/orders/:order_id',
        element: <SingleOrder />,
        async loader () {
          if (!store.getState().orders.value) {
            return redirect('/orders')
          }
          return null
        }
      },
      {
        path: '/orders/:order_id/edit',
        element: <EditOrder />,
        async loader () {
          if (!store.getState().orders.value) {
            return redirect('/orders')
          }
          return null
        }
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }

])
