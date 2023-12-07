const express=require("express");
const app =express();
app.use(express.json());
const cors=require('cors')
app.use(cors());
require('dotenv').config();
const connection = require("./config/db");
const {userRouter}= require("./router/allRouter")




app.get("/",(req, res)=>{
    res.send("welcome ")
})

app.use(userRouter)

app.listen(process.env.port, async()=>{
    await connection;
    console.log("connected to port" ,process.env.port)
})