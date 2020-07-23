const mongoose = require("mongoose");

var airplaneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    flightLogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flightlog"
        }
    ],
    maintInterval: {
        type: Number,
        default: 480
    },
    mLogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mlog"
        }
    ]
},{ timestamps: true });

const Airplane = mongoose.model("Airplane", airplaneSchema);
module.exports = Airplane;