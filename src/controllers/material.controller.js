const mongoose = require("mongoose");
const Material = require("../models/Material");

class MaterialController {

    getAll = async (req, res) => {

        const materials = await Material.find();

        res.status(200).json({ data: materials });
    };


    getById = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const material = await Material.findById(id);

        if (!material) {
            return res.status(404).json("Material Not Found");
        }

        res.status(200).json({ data: material });
    };


    add = async (req, res) => {

        const {
            title,
            author,
            publisher,
            publicationYear,
            category,
            totalCopies,
            availableCopies,
            coverImageUrl,
            materialType,
            ISBN,
            issueNumber,
            month,
            year
        } = req.body;

        const material = await Material.create({
            title,
            author,
            publisher,
            publicationYear,
            category,
            totalCopies,
            availableCopies,
            coverImageUrl,
            materialType,
            ISBN,
            issueNumber,
            month,
            year
        });

        res.status(201).json({ data: material });
    };


    update = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const material = await Material.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!material) {
            return res.status(404).json("Material Not Found");
        }

        res.status(200).json({ data: material });
    };


    remove = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const material = await Material.findByIdAndDelete(id);

        if (!material) {
            return res.status(404).json("Material Not Found");
        }

        res.status(200).json({ data: null });
    };

}

module.exports = new MaterialController();