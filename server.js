const express = require('express');
const server = express();
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('./config/passportConfig');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');

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

server.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 360000 }
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use(function(req, res, next){
    res.locals.alert = req.flash();
    res.locals.currentUser = req.user;
    next();
});

server.get("/", (req, res) => {
    res.redirect("/dashboard");
});

server.use(require("./routes/auth.route"));

server.listen(process.env.PORT, () => {
    console.log(`connected to express on ${process.env.PORT}`);
})