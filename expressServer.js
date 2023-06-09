const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

const port =  process.env.PORT||3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const url = process.env.DB_URL
// console.log(url)

mongoose.connect(url)
.then((response) => {
    console.log("connected to mongod DB successfully!");
})
.catch(err => {
    console.log("connection to DB failed", err);
})


