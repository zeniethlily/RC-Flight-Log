const router = require('express').Router();
const User = require("../models/user.model");
const passport = require("../config/passportConfig");
const isLoggedIn = require("../config/loginBlocker");
const Flightlog = require('../models/flightlog.model');

router.get("/auth/signup", (req, res) => {
    res.render("auth/signup");
});

router.post("/auth/signup", async (req, res) => {
    //console.log(req.body);
    try {
        let user = new User(req.body);

        let savedUser = await user.save();

        if(savedUser){
            passport.authenticate("local", {
                successRedirect: "/dashboard",
                successFlash: "Login Successful!"
            })(req, res);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/auth/signin", (req, res) => {
    res.render("auth/signin");
});

router.get("/dashboard", isLoggedIn, (req, res) => {
    User.findById(req.user._id, "airplanes")
    .populate({
        path: "airplanes",
        populate: { path: "flightLogs" }
    })
    .then(user => {
        let airplanes = user.airplanes;
        
        res.render("dashboard/index", { airplanes });
    });
   
    
});

router.post("/auth/signin", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/signin",
    failureFlash: "Invalid Username/Password",
    successFlash: "Logged in!"
})
);

router.get("/auth/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged out!");
    res.redirect("/auth/signin");
})

module.exports = router;