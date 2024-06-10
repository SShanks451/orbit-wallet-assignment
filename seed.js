import User from "./models/UserModel.js";
import Transaction from "./models/TransactionModel.js";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

connectDB();

const seedDB = async () => {
  await User.deleteMany({});
  await Transaction.deleteMany({});

  const users = [];

  for (let i = 0; i < 100; i++) {
    const num = i + 1;

    const user = new User({
      _id: num.toString(),
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    });

    users.push(user);
  }

  await User.insertMany(users);

  const transactions = [];

  users.forEach((user) => {
    for (let i = 0; i < 500; i++) {
      const transaction = new Transaction({
        status: faker.helpers.arrayElement(["Success", "Pending", "Failure"]),
        type: faker.helpers.arrayElement(["Debit", "Credit"]),
        transactionDate: faker.date.past(),
        amount: faker.finance.amount(),
        userId: user._id,
      });

      transactions.push(transaction);
    }
  });

  await Transaction.insertMany(transactions);

  console.log("Database seeded");
};

seedDB().then(() => {
  mongoose.connection.close();
});
