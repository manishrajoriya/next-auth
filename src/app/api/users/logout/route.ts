import {connect} from "@/dbConfig/dbConfig"

import {NextRequest, NextResponse} from "next/server"




connect()

export async function GET(request:NextRequest){
    try {
       const responce = NextResponse.json({
            message: "Logout successfully",
            success: true
       })

       responce.cookies.set({
        name: "token",
        value: "",
        httpOnly: true,
        expires: new Date(0)
       })

       return responce


    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}