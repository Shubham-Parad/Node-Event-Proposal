const express = require('express');
const cors = require('cors');
const router = require("./router/route");

require('./connection/connect');


const app = express();
app.use(express.json());
app.use(router);
app.use(cors({
    origin: "http://localhost:3000"
}));

app.get("/", (req, res)=>{
    res.send("Home").status(200);
});

app.listen(4000, (req, res)=>{
    console.log("Port is running");
});
