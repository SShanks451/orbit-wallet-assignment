import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import "dotenv/config";

const app = express();
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
