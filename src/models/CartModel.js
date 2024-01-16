import mongoose from 'mongoose';

const UserCart = new mongoose.Schema({
    ItemId : String,
    ItemName : String,
    Price : Number,
    UserName : String,
    Userid : String,
    Quantity : Number,
})

const Cart = mongoose.models.Cart || mongoose.model('Cart', UserCart);

export default Cart;