import axios  from 'axios';
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react';
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingPage from './pages/tracking/TrackingPage'
import ErrorPage from './pages/error/ErrorPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCartData = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    };
    getCartData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path='/orders' element={<OrdersPage cart={cart} />} />
      <Route path='/tracking' element={<TrackingPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
