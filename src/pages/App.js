import { Outlet } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import '../App.css'

function App () {
  return (
    <div className='App'>
      <LogoutButton />
      <Outlet />
    </div>
  )
}

export default App
