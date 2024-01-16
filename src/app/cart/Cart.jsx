import React, { useEffect, useState } from 'react'
import "./cart.css"
import { DeleteCart, setcart } from "../../../lib/slices/CartSlice"
import { useDispatch } from "react-redux"
import axios from 'axios'
import { useSession } from 'next-auth/react'

const Cart = () => {

    const dispatch = useDispatch();
    const [ cartItems, setCartItems] = useState([]);
    const { data: session } = useSession();
    const [updateCart, setUpdateCart] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.post('/api/cart/showItems',{ userId : session?.user.id});
          setCartItems(res.data.cart);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    },[session, updateCart])

    useEffect(()=>{
      dispatch(setcart(cartItems));
    },[cartItems, dispatch])

    const deleteItem = async(itemid) => {
      try {
        const res = await axios.delete('/api/cart/deleteItem', { data: { itemid } });
        alert(res.data.msg);
        setUpdateCart(!updateCart);
      } catch (error) {
        console.error(error);
      }
    }

    const deleteAllItems = () => {
        try {
          const res = axios.delete('/api/cart/deleteItem/all', { data : { userid : session?.user.id }});
          alert(res.data.msg);
          setUpdateCart(!updateCart);
        } catch (error) {
          console.error(error);
        }
    }

    const handleTotal = cartItems.reduce((acc, item) => acc + item.Price * item.Quantity, 0);

  return (
    <>
    <div className="cartContainer1">
    <div className="cartSummary">
      <h2>Cart Summary</h2>
      <div>{cartItems.length} Item(s) in cart</div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className='item-ul'>
          {cartItems.map((item) => (
            <li key={item._id} className='item-list'>
              <div>{item.ItemName}({item.Quantity})</div>
              <div>₹{item.Price * item.Quantity}</div>
              <button className="deleteButton" onClick={() => deleteItem(item._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>Total: ₹{handleTotal}</div>
    </div>
  </div>
      {cartItems.length > 0 && (
        <div className='deleteAllcontainer'>
        <button className="deleteAllButton" onClick={deleteAllItems}>Delete All Items</button>
        </div>
      )}
  </>
  )
}

export default Cart
