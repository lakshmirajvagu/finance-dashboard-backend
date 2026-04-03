const Record = require("../models/Record");


// 🔹 CREATE RECORD (Admin only)
exports.createRecord = async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();

    res.status(201).json({
      message: "Record created successfully",
      data: record
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 GET ALL RECORDS (Viewer + Analyst + Admin) with Pagination
exports.getAllRecords = async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = { isDeleted: false }; // ✅ IMPORTANT

    const records = await Record.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 });

    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: records
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 FILTERED RECORDS (Admin + Analyst only)
exports.getFilteredRecords = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 5,
      type,
      category,
      startDate,
      endDate,
      sort = "desc"
    } = req.query;

    // Convert to numbers
    page = parseInt(page);
    limit = parseInt(limit);

    // Base filter (soft delete)
    let filter = { isDeleted: false };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Sorting
    const sortOption = sort === "asc" ? 1 : -1;

    const records = await Record.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: sortOption });

    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: records
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 SEARCH RECORDS (Admin + Analyst only)
exports.searchRecords = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const records = await Record.find({
      isDeleted: false,
      $or: [
        { category: { $regex: query, $options: "i" } },
        { notes: { $regex: query, $options: "i" } }
      ]
    }).sort({ date: -1 });

    res.json({
      count: records.length,
      data: records
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 UPDATE RECORD (Admin only)
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false }, // ✅ prevent updating deleted
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found or deleted" });
    }

    res.json({
      message: "Record updated successfully",
      data: record
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 SOFT DELETE RECORD (Admin only)
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record || record.isDeleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.isDeleted = true;
    record.deletedAt = new Date();

    await record.save();

    res.json({ message: "Record soft deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 RESTORE RECORD (Optional 🔥)
exports.restoreRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record || !record.isDeleted) {
      return res.status(404).json({ message: "Record not found or not deleted" });
    }

    record.isDeleted = false;
    record.deletedAt = null;

    await record.save();

    res.json({ message: "Record restored successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};