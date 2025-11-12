const mongoose = require("mongoose");
const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const allDBUsers = await User.find({});
  return res.status(200).json({
    success: true,
    message: "Users get from DB successfully",
    statusCode: res.statusCode,
    data: allDBUsers
  });
};

const handleGetUserByID = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
      statusCode: res.statusCode,
    });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
      statusCode: res.statusCode,
    });
  }
  return res.status(200).json({
    success: true,
    message: "User get from DB successfully",
    statusCode: res.statusCode,
    data: user
  });
};

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  if (!body || !body.name || !body.email || !body.gender) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
      statusCode: res.statusCode
    })
  }
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "A user with this email already exists.",
      statusCode: res.statusCode
    });
  }
  const result = await User.create({
    name: body.name,
    email: body.email,
    gender: body.gender
  })
  return res.status(200).json({
    success: true,
    message: "User created successfully",
    statusCode: res.statusCode,
    data: result
  })
};

const handleUpdateUserByID = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
      statusCode: res.statusCode,
    });
  }
  const body = req.body;
  if (!body.name || !body.gender) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
      statusCode: res.statusCode
    })
  }
  const result = await User.findByIdAndUpdate(id, {
    name: body.name,
    gender: body.gender,
  }, {
    new: true
  })
  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    statusCode: res.statusCode,
    data: result
  })
};

const handleDeleteUserByID = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
      statusCode: res.statusCode,
    });
  }
  await User.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    statusCode: res.statusCode,
  })
};

module.exports = {
  handleGetAllUsers,
  handleGetUserByID,
  handleCreateNewUser,
  handleUpdateUserByID,
  handleDeleteUserByID
};