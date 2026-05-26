const express = require("express");
const asyncHandler = require("../utils/asyncHandler")
const  MaterialController = require("../controllers/material.controller");
const  router = express.Router();
const idMiddleware = require("../middlewares/id");

router.get("/" , asyncHandler(MaterialController.getAll));

router.get("/:id" , [idMiddleware] , asyncHandler(MaterialController.getById));


router.post("/"  , asyncHandler(MaterialController.add));


router.put("/:id" , [idMiddleware] , asyncHandler(MaterialController.update));


router.delete("/:id" , [idMiddleware] , asyncHandler(MaterialController.remove));

module.exports = router;