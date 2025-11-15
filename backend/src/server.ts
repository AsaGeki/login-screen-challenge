import express from "express"

const app = express();

app.get("/", (req, res)=>{
    return res.status(302).json({
        "chave": "valor"
    })
});

app.listen(5000,()=>{
    console.log("http://localhost:5000")
})
