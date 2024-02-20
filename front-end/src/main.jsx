import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NavigationBar from './components/navigation-bar/NavigationBar'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="w-full min-h-screen h-auto bg-[#171717]">
      <NavigationBar />
      <App />
    </div>
  </React.StrictMode>,
)
