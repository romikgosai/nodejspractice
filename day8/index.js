import express from "express";
import userRouter from "./routes/userRoutes.js"

const app = express();
app.use(express.json())


app.use("/user", userRouter);

app.listen(8000,async () =>{
    console.log("Server has started");
});