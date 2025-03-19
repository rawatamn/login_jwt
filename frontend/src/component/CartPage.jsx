import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>₹{item.price} x {item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
