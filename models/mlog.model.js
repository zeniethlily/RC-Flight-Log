const mongoose = require("mongoose");

var mlogSchema = new mongoose.Schema(
    {
        logDate: {
            type: Date,
            required: true
        },
        aircraft: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airplane"
        },
        description: String,
    }, { timestamps: true }
);

const Mlog = mongoose.model("Mlog", mlogSchema);
module.exports = Mlog;