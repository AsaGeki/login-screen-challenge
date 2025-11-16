import express from "express"
import userRoutes from "./routes/user.route"
import verifyRoutes from "./routes/emailVerify.route";

const app = express();
app.use(express.json())

app.use("/user", userRoutes)
app.use("/verify", verifyRoutes)

app.get("/", (req, res)=>{
    return res.status(302).json({
        "chave": "valor"
    })
});

app.listen(5000,()=>{
    console.log("http://localhost:5000")
})
