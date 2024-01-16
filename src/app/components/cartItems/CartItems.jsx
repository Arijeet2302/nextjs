import React, { useEffect, useState } from 'react';
import "./cartitems.css";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../../../../lib/slices/CartSlice';

const CartItemsComponent = () => {

    const [ Items, setItems] = useState([]);
    const dispatch = useDispatch();
    const [ msg, setMsg] = useState("");
    const { data : session } = useSession();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/Items');
                setItems(res.data.items);
                setMsg(res.data.msg);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    },[]);

    const addItemToCart = async(item) => {
        try {
            const res = await axios.post('/api/cart/addItem',{
                itemid : item._id,
                userid : session?.user.id,
                username : session?.user.name,
                itemname : item.ItemName,
                price : item.Price,
            });
            alert(res.data.msg);
            dispatch(AddToCart(item));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="cartContainer">
            { Items.map((item)=>(
                <div className="itemContainer" key={item._id}>
                    <div className="itemName">{item.ItemName}</div>
                    <div className="itemPrice"> ₹{item.Price}</div>
                    <button className="addToCartBtn" onClick={() => addItemToCart(item)}>Add to Cart</button>
                </div>
            ))}
            <div className='item-msg'>{msg}</div>
        </div>
    );
};

export default CartItemsComponent;
