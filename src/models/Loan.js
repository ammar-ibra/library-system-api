const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    materialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true
    },

    librarianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    loanDate: {
        type: Date,
        default: Date.now
    },

    dueDate: {
        type: Date,
        required: true
    },

    actualReturnDate: {
        type: Date
    },

    status: {
        type: String,
        enum: ["active", "returned", "overdue", "cancelled"],
        default: "active"
    },

    finePerDay: {
        type: Number,
        default: 0.5
    },

    totalFineAmount: {
        type: Number,
        default: 0
    },

    paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
    }

}, {
    timestamps: true
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;