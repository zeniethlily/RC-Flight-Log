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

module.exports = router;