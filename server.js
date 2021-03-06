const express = require('express');
const server = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('./config/passportConfig');
const expressLayouts = require('express-ejs-layouts');
let moment = require('moment');
let shortDateFormat = "Do MMMM YYYY";
const flash = require('connect-flash');

require('dotenv').config();

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODBLIVE, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then(() => {
        console.log("mongeese is running away!");
    }).catch((err) => {
        console.log(err);
    }); 
    
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(expressLayouts);

server.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 8640000 },
    store: new MongoStore({ url: process.env.MONGODBLIVE }),
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use(function(req, res, next){
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});

server.locals.moment = moment;
server.locals.shortDateFormat = shortDateFormat;

server.get("/", (req, res) => {
    res.redirect("/dashboard");
});

server.use("/mlogs", require("./routes/mlog.route"));
server.use("/flightlogs", require("./routes/flightlog.route"));
server.use("/airplanes", require("./routes/airplane.route"));
server.use(require("./routes/auth.route"));

server.listen(process.env.PORT, () => {
    console.log(`connected to express on ${process.env.PORT}`);
})