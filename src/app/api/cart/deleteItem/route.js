import Cart from "@/models/CartModel";
import connectMongoDB from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";

const deleteCart = async (req) => {
    try {
        await connectMongoDB();
        const {itemid} = await req.json();
        const document = await Cart.findByIdAndDelete(itemid);
        if(!document) return NextResponse.json({msg : "No Item Found"});
        return NextResponse.json({msg : "Item Deleted"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg : "Something went Wrong"});
    }
}

export { deleteCart as DELETE };