const mongoose = require("mongoose");
const Loan = require("../models/Loan");
const Material = require("../models/Material");

class LoanController {

    getAll = async (req, res) => {

        const loans = await Loan
            .find()
            .populate("memberId materialId librarianId");

        res.status(200).json({ data: loans });
    };


    getById = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const loan = await Loan
            .findById(id)
            .populate("memberId materialId librarianId");

        if (!loan) {
            return res.status(404).json("Loan Not Found");
        }

        res.status(200).json({ data: loan });
    };


    add = async (req, res) => {

        const {
            status,
            memberId,
            librarianId,
            materialId,
            loanDate,
            dueDate,
            actualReturnDate,
            finePerDay,
            totalFineAmount,
            paymentStatus
        } = req.body;

        if (
            !mongoose.Types.ObjectId.isValid(memberId) ||
            !mongoose.Types.ObjectId.isValid(librarianId) ||
            !mongoose.Types.ObjectId.isValid(materialId)
        ) {
            return res.status(400).json("Invalid ID");
        }

        const material = await Material.findById(materialId);

        if (!material) {
            return res.status(404).json("Material Not Found");
        }

        if (material.availableCopies <= 0) {
            return res
                .status(400)
                .json("Material Not Available For Loan");
        }

        const loan = await Loan.create({
            status,
            memberId,
            librarianId,
            materialId,
            loanDate,
            dueDate,
            actualReturnDate,
            finePerDay,
            totalFineAmount,
            paymentStatus
        });

        material.availableCopies -= 1;

        await material.save();

        res.status(201).json({ data: loan });
    };


    update = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const {
            actualReturnDate,
            status
        } = req.body;

        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json("Loan Not Found");
        }

        if (
            actualReturnDate &&
            status === "returned" &&
            loan.status !== "returned"
        ) {

            const material = await Material.findById(loan.materialId);

            if (material) {
                material.availableCopies += 1;

                await material.save();
            }
        }

        Object.assign(loan, req.body);

        await loan.save();

        res.status(200).json({ data: loan });
    };


    remove = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json("Loan Not Found");
        }

        if (loan.status === "active") {

            const material = await Material.findById(loan.materialId);

            if (material) {
                material.availableCopies += 1;

                await material.save();
            }
        }

        await Loan.findByIdAndDelete(id);

        res.status(200).json({ data: null });
    };

}

module.exports = new LoanController();