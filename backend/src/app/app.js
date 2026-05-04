import express from "express"
import cors from "cors";
import userRouter from "../router/userRouter.js"


const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running...");

});
app.use("/",userRouter)


export default app;