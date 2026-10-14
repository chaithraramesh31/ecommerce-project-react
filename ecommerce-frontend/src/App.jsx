import { Routes, Route } from 'react-router'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingPage from './pages/tracking/TrackingPage'
import ErrorPage from './pages/error/ErrorPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path='/orders' element={<OrdersPage />} />
      <Route path='/tracking' element={<TrackingPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
