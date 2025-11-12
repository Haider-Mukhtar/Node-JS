const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserByID,
  handleCreateNewUser,
  handleUpdateUserByID,
  handleDeleteUserByID
} = require("../controllers/user");

const router = express.Router();

// POST
router.post("/", handleCreateNewUser);

// GET All
router.get("/", handleGetAllUsers);

// GET by ID
router.get("/:id", handleGetUserByID);

// PATCH
router.patch("/:id", handleUpdateUserByID);

// Delete
router.delete("/:id", handleDeleteUserByID);

// Combine Similar Routes
// router
//   .route("/:id")
//   .get(handleGetUserByID)
//   .patch(handleUpdateUserByID)
//   .delete(handleDeleteUserByID);

module.exports = router;