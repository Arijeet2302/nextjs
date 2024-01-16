import Cart from "@/models/CartModel";
import connectMongoDB from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";

const showItem = async (req) =>{
    try {
        await connectMongoDB();
        const { userId } = req.json();
        const cart = await Cart.find({ Userid : userId });
        if(!cart) return NextResponse.json({msg : "No cartItem found"}); 
        if ( cart.length === 0 ) {
            return NextResponse.json({msg : "No cartItem Yet", cart: []});
        }else{
            return NextResponse.json({cart : cart, msg : ""});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: "Internal server error"});
    }
}

export { showItem as POST };