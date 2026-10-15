import CartItemDetails from './CartItemDetails';

function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
          return deliveryOption.id === cartItem.deliveryOptionId;
        })

        return (
          <CartItemDetails key={cartItem.productId} cartItem={cartItem} selectedDeliveryOption={selectedDeliveryOption} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
        );
      })}
    </div>
  );
}

export default OrderSummary;