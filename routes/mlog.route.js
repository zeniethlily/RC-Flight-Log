const router = require("express").Router();
const Mlog = require("../models/mlog.model");
const Airplane = require("../models/airplane.model");

router.get("/new/:id", (req, res) => {
    Airplane.findById(req.params.id)
    .then(airplane => {
        res.render("mlogs/new", { airplane });
    })
    .catch((err) => {
        console.log(err);
    })
});

router.post("/new/:id", (req, res) => {
    let finalData = {
        aircraft: req.params.id,
        logDate: req.body.logDate,
        description: req.body.description,
    };

    let mLog = new Mlog(finalData);
    mLog.save()
    .then(() => {
        Airplane.findByIdAndUpdate(req.params.id, {
            $push: { mLogs: mLog._id }
        }).then(() => {
            req.flash("success", "Flight Log Created!");
            res.redirect(`/airplanes/view/${req.params.id}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get("/list/:id", (req, res) => {
    Airplane.findById(req.params.id)
    .populate("mLogs")
    .then(airplane => {
        res.render("mlogs/list", { airplane });
    })
    .catch((err) => {
        console.log(err);
    })
    
});

router.get("/view/:id", (req, res) => {
    Mlog.findById(req.params.id)
    .populate("aircraft")
    .then(log => {
        res.render("mlogs/view", { log })
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/delete/:planeid/:logid", async (req, res) => {
    try {
        await Mlog.findByIdAndDelete(req.params.logid);
        let airplane = await Airplane.findByIdAndUpdate(req.params.planeid, { $pull: {
                 mLogs: req.params.logid } });

        res.redirect(`/mlogs/list/${airplane._id}`);
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;