import {connect} from "@/dbConfig/dbConfig"
import User from "@/modles/userModle"

import {NextRequest, NextResponse} from "next/server"

import { getdataFromToken } from "@/helpers/getDataFromToken"



connect()

export async function POST(request:NextRequest){

    //extract data from token
    const userId = await getdataFromToken(request)
    console.log(userId);
    const user = await User.findOne({_id: userId}).select("-password")

    return NextResponse.json({
        message: "user data fetched successfully",
        data: user
    })
   
}