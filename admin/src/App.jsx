import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (

    <div>

      <Toaster />
   
      <Routes>
        <Route path='/' element={<AdminLogin />} />
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
      </div>
   
  )
}

export default App;