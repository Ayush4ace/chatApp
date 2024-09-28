import  express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/database.js";
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config({})
const app = express();



const PORT = process.env.PORT || 5050;
// middlewares 
app.use(express.json());
app.use(cookieParser())

// routes 

app.use("/api/v1/user", userRoute);

app.listen(PORT, ()=>{
    connectDb();
    console.log(`server is running at port ${PORT}`);
})