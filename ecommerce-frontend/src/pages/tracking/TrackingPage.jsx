import axios  from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../../components/Header';
import './TrackingPage.css';

function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState([null]);

  useEffect(() => {
    const getTrackedOrder = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    };
    getTrackedOrder();
  },[orderId]);

  if(!order) {return null;}

  const orderProduct = order.products?.find((orderProduct) => {
    return orderProduct.productId === productId;
  });
  const totalDeliveryTimeMs = orderProduct?.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  // const timePassedMs = totalDeliveryTimeMs * 0.3;
  const deliveryProgress = Math.min(((timePassedMs / totalDeliveryTimeMs) * 100), 100);
  const isPreparing = deliveryProgress < 30;
  const isShipping = deliveryProgress >= 30 && deliveryProgress < 100;
  const isDelivered = deliveryProgress === 100;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            {isDelivered ? 'Delivered On ' : 'Arriving On '}
            {dayjs(orderProduct?.estimatedDeliveryTimeMs).format('MMMM, D')}
          </div>

          <div className="product-info">
            { orderProduct?.product.name }
          </div>

          <div className="product-info">
            Quantity: { orderProduct?.quantity }
          </div>

          <img className="product-image" src={orderProduct?.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipping && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryProgress}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;