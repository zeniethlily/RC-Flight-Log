const router = require("express").Router();
const Flightlog = require("../models/flightlog.model");
const Airplane = require("../models/airplane.model");

router.get("/new/:id", (req, res) => {
    Airplane.findById(req.params.id)
    .then(airplane => {
        res.render("flightlogs/new", { airplane });
    })
    .catch((err) => {
        console.log(err);
    })
});

router.post("/new/:id", (req, res) => {
    let finalData = {
        aircraft: req.params.id,
        flightDate: req.body.flightDate,
        description: req.body.description,
        duration: req.body.duration
    };

    let flightLog = new Flightlog(finalData);
    flightLog.save()
    .then(() => {
        Airplane.findByIdAndUpdate(req.params.id, {
            $push: { flightLogs: flightLog._id }
        }).then(() => {
            req.flash("success", "Flight Log Created!");
            res.redirect("/dashboard");
        })
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get("/view/:id", (req, res) => {
    Flightlog.findById(req.params.id)
    .populate("aircraft")
    .then(log => {
        res.render("flightlogs/view", { log })
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;