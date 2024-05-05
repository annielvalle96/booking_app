import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { DarkModeProvider } from './contexts/darkModeContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </AuthContextProvider>
  // </React.StrictMode>
)
