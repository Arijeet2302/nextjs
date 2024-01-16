import Cart from "@/models/CartModel";
import connectMongoDB from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";

const addItem = async (req) => {
    try {
        await connectMongoDB();
        const { itemid, userid, username, itemname, price } = await req.json();

        const cart = await Cart.findOne(
            { $and : [
                {Userid : { $eq : userid}},
                {ItemId : { $eq : itemid}},
            ]
        });
        if (cart) {
            const newQuantity = cart.Quantity + 1;
            const newCart = await Cart.findOneAndUpdate(
                { $and : [
                    {Userid : { $eq : userid}},
                    {ItemId : { $eq : itemid}},
                ]
            },
            {
                $set : { Quantity : newQuantity }
            },
            );

        }else{
            await Cart.create({
                ItemId : itemid,
                ItemName : itemname,
                Price : price,
                UserName : username,
                Userid : userid,
                Quantity : 1,
            })
        }

        return NextResponse.json({msg : "Item added to cart"});
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg : "Something went wrong"});
    }
}

export { addItem as POST };