const mongoose = require("mongoose");

var flogSchema = new mongoose.Schema(
    {
        flightDate: {
            type: Date,
            required: true
        },
        duration: Number,
        aircraft: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airplane"
        },
        description: String,
    }, { timestamps: true }
);

const Flightlog = mongoose.model("Flightlog", flogSchema);
module.exports = Flightlog;