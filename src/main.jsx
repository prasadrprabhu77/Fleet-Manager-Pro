import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from "./store/store.js"
import { AuthProvider } from './pages/Auth/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
