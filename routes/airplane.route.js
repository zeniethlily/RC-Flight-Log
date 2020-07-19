const router = require("express").Router();
const isLoggedIn = require("../config/loginBlocker");
const User = require("../models/user.model");
const Airplane = require("../models/airplane.model");

router.get("/new", (req, res) => {
    res.render("airplanes/new");
});

router.post("/new", (req, res) => {
    let airplaneData = {
        name: req.body.name,
        ownedBy: req.user._id,
    };

    let airplane = new Airplane(airplaneData);
    airplane.save()
    .then(() => {
        User.findByIdAndUpdate(req.user._id, {
            $push: { airplanes: airplane._id }
        }).then(() => {
            req.flash("success", "New Airplane Created!");
            res.redirect("/dashboard");
        });
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;