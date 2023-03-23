import store from '../store/store'
import { useNavigate } from 'react-router-dom'
import '../pages/styles/logout_button.css'
export default function Logout () {
  const navigate = useNavigate()
  return (
    <div className='logout-button' title='Change Your Seller Id'>
      <button onClick={() => logout(navigate)}>Logout</button>
    </div>
  )
}
function logout (navigate) {
  store.dispatch({ type: 'seller/clear' })
  store.dispatch({ type: 'orders/clear' })
  window.localStorage.removeItem('seller')
  navigate('/login')
}
