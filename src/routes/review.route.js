
const express = require("express");
const asyncHandler = require("../utils/asyncHandler")
const ReviewController = require("../controllers/review.controller");
const idMiddleware = require("../middlewares/id");
const router = express.Router();


router.get("/" , asyncHandler(ReviewController.getAll));

router.get("/:id" , [idMiddleware] , asyncHandler(ReviewController.getById));


router.post("/" , asyncHandler(ReviewController.add));


router.put("/:id" , [idMiddleware] , asyncHandler(ReviewController.update));


router.delete("/:id" , [idMiddleware] , asyncHandler(ReviewController.remove));


module.exports = router;