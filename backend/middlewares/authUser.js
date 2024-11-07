import jwt from "jsonwebtoken"

//user authentication middleware

export const authUser=async(req,res,next)=>{

  try{
    const {token}=req.headers
    if(!token){
      return res.json({
        success:false,
        message:"Not Authorized Login Again!"
      })
    }

    const token_decode=jwt.verify(token,process.env.JWT_SECRET )

    // if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMINI_PASSWORD){
    //   return res.json({
    //     success:false,
    //     message:"Not Authorized Login Again!"
    //   })
    // }

    req.body.userId=token_decode.id
     next()
  }
  catch(error)
{
    console.log(error)
    res.json({
        success:false,
        message:error.message
    })
}
}