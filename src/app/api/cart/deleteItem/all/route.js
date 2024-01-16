import Cart from "@/models/CartModel";
import connectMongoDB from "../../../../../../lib/mongodb";
import { NextResponse } from "next/server";

const deleteCartALL = async (req) => {
    try {
        await connectMongoDB();
        const {userid} = await req.json();
        const document = await Cart.deleteMany(
            { Userid : { $eq : userid} }
        );
        if(!document) return NextResponse.json({msg : "No Item Found"});
        return NextResponse.json({msg : "All Items Deleted"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg : "Something went Wrong"});
    }
}

export { deleteCartALL as DELETE };