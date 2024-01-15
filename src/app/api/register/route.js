import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

async function RegisterUser(request) {
    try {
        const { fname, lname, username, email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        const user = await User.findOne({Email : email});
        if(user) return NextResponse.json({msg : "User already exists!"});
        await User.create({
            Firstname : fname,
            LastName : lname,
            Username : username,
            Email : email,
            Password : hashedPassword,
        });
        return NextResponse.json({msg : "Acccount created Successfully!"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg : "Something went wrong!"});
    }
}

export {RegisterUser as POST};