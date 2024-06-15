import jwt from "jsonwebtoken"
export const shouldbeloggedin=async (req,res)=>{
   console.log(req.userId);
   res.status(200).json({message:"your authenticated"});
   
}
export const shoulbeadmin=async (req,res)=>{
    const token=req.cookies.token;
    if(!token){
          return res.status(401).json({message: "not authenticated"})
    }
    jwt.verify(token,"arjunjadhav733",async(err,payload)=>{
     if(err){
         return res.status(403).json({message:"token not valid"});
     }
     if(!payload.isAdmin){
        return res.status(403).json({message:"not Admin"});
     }
    })
    res.status(200).json({message:"your authenticated"});
}