import {connect} from "@/dbConfig/dbConfig"
import User from "@/modles/userModle"

import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer"


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        // validation
        // console.log("req", reqBody);
        
        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "user alredy exists"},{status: 400})
        }


        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({username, email, password: hashedPassword})

        const savedUser = await newUser.save()
        // console.log("saveduser", savedUser);

        //send verifycation mail
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "user created successfully",
            success: true,
             
            savedUser
        })
        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}