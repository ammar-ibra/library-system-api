const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String
    },

    registeredAt: {
        type: Date,
        default: Date.now
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        required: true,
        enum: ["member", "librarian", "manager"]
    }

}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;