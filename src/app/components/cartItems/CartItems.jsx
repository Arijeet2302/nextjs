import React from 'react';
import "./cartitems.css"
import { useDispatch } from 'react-redux';
import { AddToCart } from '../../Redux/slices/CartSlice';

const CartItemsComponent = () => {

    const dispatch = useDispatch();

    const addItemToCart = (itemName) => {
        dispatch(AddToCart(itemName));
    };

    return (
        <div className="cartContainer">
            <h1 className="heading">Items for Cart</h1>
            <ul className="itemList">
                <li className="item">Item 1 <button onClick={() => addItemToCart('Item 1')}>Add to Cart</button></li>
                <li className="item">Item 2 <button onClick={() => addItemToCart('Item 2')}>Add to Cart</button></li>
                <li className="item">Item 3 <button onClick={() => addItemToCart('Item 3')}>Add to Cart</button></li>
                <li className="item">Item 4 <button onClick={() => addItemToCart('Item 4')}>Add to Cart</button></li>
                <li className="item">Item 5 <button onClick={() => addItemToCart('Item 5')}>Add to Cart</button></li>
            </ul>
        </div>
    );
};

export default CartItemsComponent;
