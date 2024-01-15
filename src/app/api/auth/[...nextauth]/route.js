import connectMongoDB from "../../../../../lib/mongodb";
import User from "../../../../models/UserModel";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";



const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ Email : email });

                    if (!user) {
                        return null;
                    }

                    const isMatch = await bcrypt.compare(password, user.Password);

                    if (!isMatch) {
                        return null;
                    }
                    
                    return {
                        id : user._id,
                        name : user.Username,
                        email : user.Email,
                    };
                } catch (error) {
                    console.log(error);
                }
            }
        })
    ],
    
    session : {
        strategy : "jwt",
        maxage : 60*60*24,
    },

    callbacks: {

        async jwt({token, user, isNewUser}) {
            if (isNewUser) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({session, token}) {
            if(token){
                session.user = token;
            }
            return session;
        },
    },    

    secret : process.env.NEXTAUTH_SECRET,

    pages : {
        signIn : "/login"
    },
};

const handler = NextAuth(authOptions);

export { handler  as GET, handler as POST  };