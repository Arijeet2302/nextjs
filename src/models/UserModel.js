import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Firstname : String,
    LastName : String,
    Username : {
        type : String,
        required : true,
        unique : true,
    },
    Password : {
        type : String,
        required : true,
        unique : true,
    },
    Email : {
        type : String,
        required : true,
        unique : true,
    }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;