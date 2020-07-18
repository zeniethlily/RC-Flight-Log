const router = require('express').Router();
const User = require("../models/user.model");
const passport = require("../config/passportConfig");
const isLoggedIn = require("../config/loginBlocker");

router.get("/auth/signup", (req, res) => {
    res.render("auth/signup");
});

router.post("/auth/signup", async (req, res) => {
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

router.get("auth/signin", (req, res) => {
    res.render("auth/signin");
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard/index");
});

module.exports = router;