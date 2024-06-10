import express from "express";
import { getTransactionsByUserId, getTransactions } from "../controllers/transactionController.js";

const router = express.Router();

router.route("/:id").get(getTransactionsByUserId);
router.route("/").get(getTransactions);

export default router;
