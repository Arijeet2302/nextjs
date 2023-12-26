import React from 'react'
import "./cart.css"
import { DeleteItem, DeleteCart } from "../Redux/slices/CartSlice"
import { useDispatch, useSelector } from "react-redux"

const Cart = () => {

    const dispatch = useDispatch();
    const cartCount = useSelector((state) => state.cart.count);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const deleteItem = (item) => {
        dispatch(DeleteItem(item));
    }

    const deleteAllItems = () => {
        dispatch(DeleteCart());
    }

  return (
    <div className="cartContainer">
    <div className="cartSummary">
      <h2>Cart Summary</h2>
      <div>{cartCount} Item(s) in cart</div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item}
              <button className="deleteButton" onClick={() => deleteItem(item)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button className="deleteAllButton" onClick={deleteAllItems}>
          Delete All Items
        </button>
      )}
    </div>
  </div>
  )
}

export default Cart
