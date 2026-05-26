const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({

    materialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true
    },

    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    reservedAt: {
        type: Date,
        default: Date.now
    },

    queuePriority: {
        type: Number
    },

    notifiedWhenAvailable: {
        type: Boolean,
        default: false
    },

    autoCancelAfter: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;