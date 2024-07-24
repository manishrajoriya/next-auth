import User from "@/modles/userModle";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        const hasedToken = await bcryptjs.hash(userId.toString(), 10)
        // console.log("hased", hasedToken);
        
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {verifyToken: hasedToken, verifyTokenExpiry:Date.now() + 3600000})
        }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hasedToken, forgotPasswordTokenExpiry:Date.now() + 3600000})
        }

      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "5f84c4561b32c5",
        pass: "5fbfa383cd4866"
  }
});


    const mailOption = {
         from: 'gkrajoriya3@gmail.com', // sender address
         to: email, // list of receivers
         subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password" , // Subject line
    
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
            </p>`
    }

    const mailResponce =  await transport.sendMail(mailOption)
    return mailResponce

    } catch (error:any) {
        throw new Error(error.message)
    }
}