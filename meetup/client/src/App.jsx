import React from 'react'
import {Toaster} from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedRoutes from './component/ProtectedRoutes'
import ProtectedLayout from './component/ProtectedLayout'
import Dashboard from './pages/Dashboard'
import Session from './pages/Session'
import Pricing from './pages/Pricing'
import MeetingRoom from './pages/MeetingRoom'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login mode="login"/>} />
        <Route path='/register' element={<Login mode="register"/>} />

        {/* Private Routes  */}

        <Route element={<ProtectedRoutes/>}>
          <Route element={<ProtectedLayout />}>
            <Route path='/dashboard' element={<Dashboard/> } />
            <Route path='/session' element={<Session/> } />
            <Route path='/pricing' element={<Pricing/> } />
            
          </Route>
          
            <Route path='/meeting/:meetingId' element={<MeetingRoom/> } />
        </Route>


      {/* Other Routes */}
            <Route path='*' element={<Navigate to='/dashboard'replace/> } />
      </Routes>
    </>
  )
}

export default App