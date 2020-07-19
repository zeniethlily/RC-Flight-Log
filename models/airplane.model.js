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
    status: {
        type: String,
        enum: ["flightReady", "serviceRequired", "serviceCompleted"],
        default: "flightReady"
    },
    flightLogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flightlog"
        }
    ],
},{ timestamps: true });

const Airplane = mongoose.model("Airplane", airplaneSchema);
module.exports = Airplane;