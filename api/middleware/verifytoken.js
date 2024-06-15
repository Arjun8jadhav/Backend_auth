import jwt from "jsonwebtoken";
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
          return res.status(401).json({message: "not authenticated"})
    }
    jwt.verify(token,"arjunjadhav733",async(err,payload)=>{
     if(err){
         return res.status(403).json({message:"token not valid"});
     }
     req.userId=payload.id;
     next();
    })
}