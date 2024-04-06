const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://hlev2454:passwordmongo@barknetcluster.ksy8pmw.mongodb.net/Dbdevops?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Define schema and model for user
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  idCard: String,
  password: String,
  role: String,
  course: String,
});

const User = mongoose.model("users", userSchema);

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

// Route to check if the identity certificate already exists
app.post("/check-id", async (req, res) => {
  const { idCard } = req.body;

  try {
    const existingUser = await User.findOne({ idCard });
    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking ID:", error);
    res
      .status(500)
      .json({ message: "An error occurred while checking the ID." });
  }
});

// Route to handle user registration
app.post("/", (req, res) => {
  const userData = req.body;

  // Create a new user instance
  const newUser = new User(userData);

  // Save the user to the database
  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "User registered successfully." });
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res
        .status(500)
        .json({ message: "An error occurred while registering the user." });
    });
});
// Add a route to handle login requests
app.post("/login.html", async (req, res) => {
  const { idCard, password } = req.body;

  // Find user in the database by idCard and password
  try {
    const user = await User.findOne({ idCard, password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
});

// Route to serve your HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
