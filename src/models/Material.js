const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    publisher: {
        type: String,
        required: true
    },

    publicationYear: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: ["fiction", "science", "history", "technology"]
    },

    ISBN: {
        type: String,
        unique: true,
        required: function () {
            return this.materialType === "book";
        }
    },

    totalCopies: {
        type: Number,
        required: true,
        min: 0
    },

    availableCopies: {
        type: Number,
        required: true,
        min: 0
    },

    coverImageUrl: {
        type: String,
        required: true
    },

    materialType: {
        type: String,
        required: true,
        enum: ["book", "magazine", "cd", "map"]
    },

    issueNumber: {
        type: Number,
        required: function () {
            return this.materialType === "magazine";
        }
    },

    month: {
        type: String,
        required: function () {
            return this.materialType === "magazine";
        }
    },

    year: {
        type: Number,
        required: function () {
            return this.materialType === "magazine";
        }
    }

}, {
    timestamps: true
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;