import Transaction from "../models/TransactionModel.js";

const getTransactionsByUserId = async (req, res) => {
  const userId = req.params.id;

  const { status, type, from, to, page = 1, transactionsPerPage = 5 } = req.query;

  const filters = {};

  if (status) filters.status = status;
  if (type) filters.type = type;
  if (from || to) {
    filters.transactionDate = {};
    if (from) filters.transactionDate.$gte = new Date(new Date(from).setHours(0, 0, 0));
    if (to) filters.transactionDate.$lte = new Date(new Date(to).setHours(23, 59, 59));
  }

  const tranasctions = await Transaction.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $match: filters,
    },
    {
      $skip: (page - 1) * parseInt(transactionsPerPage),
    },
    {
      $limit: parseInt(transactionsPerPage),
    },
  ]);

  res.json(tranasctions);
};

const getTransactions = async (req, res) => {
  const { status, type, from, to, page = 1, transactionsPerPage = 5 } = req.query;

  const filters = {};

  if (status) filters.status = status;
  if (type) filters.type = type;
  if (from || to) {
    filters.transactionDate = {};
    if (from) filters.transactionDate.$gte = new Date(new Date(from).setHours(0, 0, 0));
    if (to) filters.transactionDate.$lte = new Date(new Date(to).setHours(23, 59, 59));
  }

  const transactions = await Transaction.aggregate([
    {
      $match: filters,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user_details",
      },
    },
    {
      $addFields: {
        user_details: {
          $arrayElemAt: ["$user_details", 0],
        },
      },
    },
    {
      $skip: (page - 1) * parseInt(transactionsPerPage),
    },
    {
      $limit: parseInt(transactionsPerPage),
    },
  ]);

  res.json(transactions);
};

export { getTransactionsByUserId, getTransactions };
