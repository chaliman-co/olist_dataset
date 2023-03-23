
import { useState } from 'react'
import './styles/login.css'
import { getSeller } from '../util'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'react-redux'
export default function Login () {
  const [sellerId, setSellerId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const store = useStore()
  return (
    <>

      <form onSubmit={(e) => { e.preventDefault(); submit(sellerId, password, navigate, store) }} className='login-form'>
        <fieldset>
          <legend>Please Login</legend>

          <div className='container'>
            <label for='username'><b>Username</b></label>
            <input
              id='username' value={sellerId}
              onChange={e => setSellerId(e.target.value)} type='text' placeholder='Enter Username' required
            />

            <label for='password'><b>Password</b></label>
            <input
              id='password' value={password}
              onChange={e => setPassword(e.target.value)}
              type='password' placeholder='Enter Password' required
            />
            <button type='submit'>Login</button>
          </div>
        </fieldset>
      </form>

    </>
  )
}
async function submit (username, password, navigate, store) {
  const response = await getSeller(username, password)
  if (response.status === 401) window.alert('Could not log in: Incorect username or password')
  else if (response.status !== 200) window.alert('Network Error. Please try again')
  else {
    const payload = await response.json()
    store.dispatch({ type: 'seller/set', payload })
    window.localStorage.setItem('seller', JSON.stringify(payload))
    navigate('/orders')
  }
}
