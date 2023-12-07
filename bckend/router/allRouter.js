const express=require("express");
const userRouter=express.Router();
const {signin, signup}=require("../controller/userController");
const {doctors, appointment, updateDoctor,
    deleteDoctor}=require("../controller/doctorController");
const authenticate=require("../middleware/auth")
// login & register
userRouter.post("/login",signin);
userRouter.post("/signup",signup);

// appointment & doctors
userRouter.get("/doctors" ,authenticate, doctors);
userRouter.post("/appointments" ,authenticate, appointment);
userRouter.put("/updatedoctors/:id" ,authenticate, updateDoctor);
userRouter.delete('/deletedoctors/:id',authenticate, deleteDoctor);
// exporting router
module.exports={userRouter}