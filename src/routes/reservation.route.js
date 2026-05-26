const express = require("express");
const ReservationController = require("../controllers/reservation.controller");
const asyncHandler = require("../utils/asyncHandler")
const idMiddleware = require("../middlewares/id");
const  router = express.Router();

router.get("/" , asyncHandler(ReservationController.getAll));

router.get("/:id" , [idMiddleware] , asyncHandler(ReservationController.getById));


router.post("/" , asyncHandler(ReservationController.add));


router.put("/:id" , [idMiddleware] , asyncHandler(ReservationController.update));


router.delete("/:id" , [idMiddleware] , asyncHandler(ReservationController.remove));

module.exports = router;