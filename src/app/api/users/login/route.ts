import {connect} from "@/dbConfig/dbConfig"
import User from "@/modles/userModle"
import bcryptjs from "bcryptjs"
import {NextRequest, NextResponse} from "next/server"
import jwt from "jsonwebtoken"



connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const { email, password} = reqBody
        // validation
        console.log( reqBody);
        
        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "user not exists"},{status: 400})
        }
        console.log("user exists");

        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({error: "invalid password"}, {status: 400})
        }

        const token = jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SECRET!, {expiresIn: '1d'} )

        const responce = NextResponse.json(
            {message: "Login successfully",
             success: true,
            }
        )

        responce.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            
        })

        return responce
        
            

        
        
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}