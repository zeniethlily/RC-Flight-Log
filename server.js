const express = require('express');
const server = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

require('dotenv').config();

mongoose.connect(process.env.MONGODB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }, 
    () => {
        console.log("mongeese is running away!");
    }
);
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(expressLayouts);

server.listen(process.env.PORT, () => {
    console.log(`connected to express on ${process.env.PORT}`);
})