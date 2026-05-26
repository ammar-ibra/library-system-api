const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");

class ReservationController {

    getAll = async (req, res) => {

        const reservations = await Reservation
            .find()
            .populate("memberId materialId");

        res.status(200).json({ data: reservations });
    };


    getById = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const reservation = await Reservation
            .findById(id)
            .populate("memberId materialId");

        if (!reservation) {
            return res.status(404).json("Reservation Not Found");
        }

        res.status(200).json({ data: reservation });
    };


    add = async (req, res) => {

        const {
            status,
            materialId,
            memberId,
            reservedAt,
            queuePriority,
            notifiedWhenAvailable,
            autoCancelAfter
        } = req.body;

        if (
            !mongoose.Types.ObjectId.isValid(memberId) ||
            !mongoose.Types.ObjectId.isValid(materialId)
        ) {
            return res.status(400).json("Invalid ID");
        }

        const reservation = await Reservation.create({
            status,
            materialId,
            memberId,
            reservedAt,
            queuePriority,
            notifiedWhenAvailable,
            autoCancelAfter
        });

        res.status(201).json({ data: reservation });
    };


    update = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const reservation = await Reservation.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!reservation) {
            return res.status(404).json("Reservation Not Found");
        }

        res.status(200).json({ data: reservation });
    };


    remove = async (req, res) => {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid ID");
        }

        const reservation = await Reservation.findByIdAndDelete(id);

        if (!reservation) {
            return res.status(404).json("Reservation Not Found");
        }

        res.status(200).json({ data: null });
    };

}

module.exports = new ReservationController();