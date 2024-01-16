import Item from "../../../models/ItemsModel";
import connectMongoDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

const ShowItems = async () => {
    try {
        await connectMongoDB();
        const items = await Item.find({});

        if (items.length > 0) {
            return NextResponse.json({items : items, msg : ""});
        }else{
            return NextResponse.json({msg: "No Items Found", items : []});
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: "Internal Server Error"});
    }
}

export { ShowItems as GET };