import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Admin from './Admin'
import Register from './Register'

function App () {
  const [loginStatus, setLoginStatus] = React.useState(false)
 
 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Login  />}
        />
        <Route path='/register' element={<Register />} />
        <Route
          path='/admin'
          element={<Admin  />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
