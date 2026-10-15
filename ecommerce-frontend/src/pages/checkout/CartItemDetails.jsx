import dayjs from 'dayjs';
import axios from 'axios';
import { useState } from 'react';
import { formatCurrency } from '../../utils/money';
import DeliveryOptions from './DeliveryOptions';

function CartItemDetails({ cartItem, selectedDeliveryOption, deliveryOptions, loadCart}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const saveCartItem = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity
    })
    setIsUpdating(false);
    await loadCart();
  }

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image"
          src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">
            {cartItem.product.name}
          </div>
          <div className="product-price">
            {formatCurrency(cartItem.product.priceCents)}
          </div>
          <div className={`product-quantity ${isUpdating ? 'is-updating-quantity' : ''}`}>
            <span>
              Quantity:
              <input type='text' value={quantity} className='update-quantity-input' onChange={(event) => {setQuantity(Number(event.target.value))}}/>
              <span className="quantity-label">{cartItem.quantity}</span>
            </span>
            <span className="save-quantity-link link-primary" onClick={saveCartItem}>
              Save
            </span>
            <span className="update-quantity-link link-primary" onClick={() => {setIsUpdating(true)}}>
              Update
            </span>
            <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
      </div>
    </div>
  );
}

export default CartItemDetails;