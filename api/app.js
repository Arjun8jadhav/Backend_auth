import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";
import testroute from "./routes/test.route.js";
const app=express();
app.use(cors({origin: "http://localhost:5173" ,credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/test',testroute);
app.use('/api/post',router);
app.use("/api/auth",authRoute);
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.listen(8800,()=>{
    console.log("server is runnig")
});