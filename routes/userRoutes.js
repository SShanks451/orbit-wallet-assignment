import express from "express";
import { getUserById } from "../controllers/userController.js";

const router = express.Router();

router.route("/:id").get(getUserById);

export default router;
