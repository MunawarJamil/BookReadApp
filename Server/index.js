const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User.model");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from frontend

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/reactUserAuth")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user); // Use 201 for created resource
  } catch (err) {
    console.error("Error creating user:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});


// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      if (user.password === password) {
        res.status(200).json("Success"); // Correct status code for successful login
      } else {
        res.status(401).json("The password is incorrect");
      }
    } else {
      res.status(404).json("No record found for this user");
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



 

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
