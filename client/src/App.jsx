import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import List from './pages/list/List.jsx'
import Hotel from './pages/hotel/Hotel.jsx'
import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import PageNotFound from './pages/page_not_found/PageNotFound.jsx'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/:id' element={<Hotel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
