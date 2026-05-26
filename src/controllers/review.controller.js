const mongoose = require("mongoose");
const Review = require("../models/Review");

class ReviewController {

    getAll = async (req, res) => {

        const reviews = await Review
            .find()
            .populate("memberId materialId");

        res.status(200).json({ data: reviews });
    };


    getById = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const review = await Review
            .findById(id)
            .populate("memberId materialId");

        if (!review) {
            return res.status(404).json("Review Not Found");
        }

        res.status(200).json({ data: review });
    };


    add = async (req, res) => {

        const {
            rating,        // ← تغيّر من stars لـ rating
            reviewText,
            memberId,
            materialId
        } = req.body;

        if (
            !mongoose.Types.ObjectId.isValid(memberId) ||
            !mongoose.Types.ObjectId.isValid(materialId)
        ) {
            return res.status(400).json("Invalid ID");
        }

        try {

            const review = await Review.create({
                rating,    // ← هون كمان
                reviewText,
                memberId,
                materialId
            });

            res.status(201).json({ data: review });

        } catch (error) {

            if (error.code === 11000) {
                return res
                    .status(400)
                    .json("Member already reviewed this material");
            }

            throw error;
        }
    };


    update = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const review = await Review.findByIdAndUpdate(
            id,
            req.body,     // ← هون req.body رح يجي فيه rating مش stars
            { new: true }
        );

        if (!review) {
            return res.status(404).json("Review Not Found");
        }

        res.status(200).json({ data: review });
    };


    remove = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json("Review Not Found");
        }

        res.status(200).json({ data: null });
    };

}

module.exports = new ReviewController();