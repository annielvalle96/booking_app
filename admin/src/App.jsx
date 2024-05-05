import './app.scss'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import List from './pages/list/List.jsx'
import Single from './pages/single/Single.jsx'
import NewUser from './pages/new/NewUser.jsx'
import NewHotel from './pages/new/NewHotel.jsx'
import NewRoom from './pages/new/NewRoom.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './assets/style/dark.scss'
import { useContext, useEffect } from 'react'
import { DarkModeContext } from './contexts/darkModeContext.jsx'
import { useAuth } from './contexts/AuthContext.jsx'
import PageNotFound from './pages/page_not_found/PageNotFound.jsx'

function App () {
  const { darkMode } = useContext(DarkModeContext)

  const { isUserAuthenticated, checkLogin } = useAuth()

  const ProtectedRoute = ({ children }) => {
    const { isUserAuthenticated } = useAuth()
    if (!isUserAuthenticated) {
      return <Navigate to='/login' />
    }
    return children
  }

  useEffect(() => {
    checkLogin()
  }, [])

  useEffect(() => {
    if (!isUserAuthenticated) {
      <Navigate to='/login' />
    }
  }, [isUserAuthenticated])

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />

          <Route path='/login' element={<Login />} />

          <Route path='/user' element={<ProtectedRoute><List type='user' /></ProtectedRoute>} />
          <Route path='/user/:userId' element={<ProtectedRoute><Single type='user' /></ProtectedRoute>} />
          <Route path='/user/new' element={<ProtectedRoute><NewUser /></ProtectedRoute>} />

          <Route path='/hotel' element={<ProtectedRoute><List type='hotel' /></ProtectedRoute>} />
          <Route path='/hotel/:hotelId' element={<ProtectedRoute><Single type='hotel' /></ProtectedRoute>} />
          <Route path='/hotel/new' element={<ProtectedRoute><NewHotel /></ProtectedRoute>} />

          <Route path='/room' element={<ProtectedRoute><List type='room' /></ProtectedRoute>} />
          <Route path='/room/:roomId' element={<ProtectedRoute><Single type='room' /></ProtectedRoute>} />
          <Route path='/room/new' element={<ProtectedRoute><NewRoom /></ProtectedRoute>} />

          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
