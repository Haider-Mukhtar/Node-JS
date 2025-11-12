const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/users-data")
  .then(() => console.log("Mongo DB Connected.."))
  .catch((err) => console.log("Mongo DB Error:", err))

// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String }
}, { timestamps: true });

// Model
const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.urlencoded({
  extended: false
}));

// POST
app.post("/api/users",
  async (req, res) => {
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
  }
);

// GET All
app.get("/api/users",
  async (req, res) => {
    const allDBUsers = await User.find({});
    return res.status(200).json({
      success: true,
      message: "Users get from DB successfully",
      statusCode: res.statusCode,
      data: allDBUsers
    });
  }
);

// GET by ID
app.get("/api/user/:id",
  async (req, res) => {
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
  }
);

// PATCH
app.patch("/api/user/:id",
  async (req, res) => {
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
  }
);

// Delete
app.delete("/api/user/:id",
  async (req, res) => {
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
  }
);

app.listen(PORT, () => {
  console.log("Server running at Port:", PORT);
});