const Record = require("../models/Record");

// TOTAL INCOME, EXPENSE, BALANCE
exports.getSummary = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let income = 0;
    let expense = 0;

    result.forEach(item => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CATEGORY-WISE TOTAL
exports.getCategorySummary = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// MONTHLY TRENDS
exports.getMonthlySummary = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};