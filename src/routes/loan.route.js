const express = require("express");          
const LoanController = require("../controllers/loan.controller"); 
const idMiddleware = require("../middlewares/id");
const asyncHandler = require("../utils/asyncHandler")
const router = express.Router();

router.get("/" , asyncHandler(LoanController.getAll));

router.get("/:id" , [idMiddleware] , asyncHandler(LoanController.getById));


router.post("/" , asyncHandler(LoanController.add));


router.put("/:id" , [idMiddleware] , asyncHandler(LoanController.update));


router.delete("/:id" , [idMiddleware] , asyncHandler(LoanController.remove));


module.exports = router;