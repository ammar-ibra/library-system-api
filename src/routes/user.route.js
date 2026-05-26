const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const UserController = require("../controllers/user.controller");
const idMiddleware = require("../middlewares/id");
const  router = express.Router();
const page = require("../middlewares/page");

router.get("/" , asyncHandler(UserController.getAll));

router.get("/pagination", [page], asyncHandler(UserController.pagination))

router.get("/:id" , [idMiddleware] , asyncHandler(UserController.getById));

router.post("/", asyncHandler(UserController.add));


router.put("/:id" , [idMiddleware] , asyncHandler(UserController.update));


router.delete("/:id" , [idMiddleware] , asyncHandler(UserController.remove));



module.exports = router;