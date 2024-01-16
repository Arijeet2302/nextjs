import mongoose from "mongoose";

const Items = mongoose.Schema({
    ItemName : String,
    Price : Number,
})

const Item = mongoose.models.Item || mongoose.model("Item", Items);

export default Item;