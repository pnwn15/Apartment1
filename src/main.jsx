import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './Navbar/navbar.jsx'
import Footer from './Footer/footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar>
    <App />
    </Navbar>
   
  </StrictMode>,
)
